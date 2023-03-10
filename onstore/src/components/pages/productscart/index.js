import React, { useEffect, useState } from "react";
import loadingGif from "../../../assets/loading.gif";
// import ItemCard from "./ItemCard";
import { Notification } from "../../../utils/Notifications";
import Cart from "./Cart";
import { Button, Grid, Typography } from "@mui/material";
import "./Cart.css";
import loadingPrimarycolorThem from "../../../assets/loadingPrimarycolorThem.gif";

// {state.mode === "dark" ?
//             <div>
//             <img
//               width="100%"
//               src={loadingPrimarycolorThem}
//               alt="Loading Cart Items"
//             />
//             </div>
//             : <img width="100%" src={loadingGif} alt="Loading Cart Items" />
//             }

import {
  query,
  where,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig/index";
import { v4 as uuid } from "uuid";
import { DarkmodeContext } from "../../../contex/darkmode/index";
import { reload } from "firebase/auth";

function CartPage() {
  const [state, dispatch] = React.useContext(DarkmodeContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setPrice] = useState(0);

  // fetch data from database
  let userInfo = JSON.parse(localStorage.getItem("user"));
  let customer_id;
  let customer_name;
  let user_id;
  try {
    customer_id = userInfo.uid;
    customer_name = userInfo.displayName;
    user_id = userInfo.uid;
  } catch (err) {
    console.error("user not found");
  }
  // console.log(user_id);

  const fetchData = async () => {
    let cart_products = JSON.parse(localStorage.getItem("cartProducts"));

    setCartProducts(cart_products);

    // console.log(cart_products, "ssss");
    const q = await query(
      collection(db, "cartproducts"),
      where("customer_id", "==", customer_id)
    );
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let myProducts = [];
        querySnapshot.forEach((doc) => {
          myProducts.push({ ...doc.data(), id: doc.id });
        });
        setCartProducts(myProducts);
        localStorage.setItem("cartproducts", JSON.stringify(myProducts));
      });
      // console.log("cart products", cartProducts);

      
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    // handlePrice();
  }, []);

  // updating the quantity of cart products.
  const handleChange = async (cartItem, d) => {
    console.log(
      "i am receiving handlechange req for this product",
      cartItem,
      d
    );

    let amount = Number(cartItem.product_amount);
    if (amount >= 1) {
      if (d === 1) {
        amount++;
      }
      if (d === -1) {
        amount = amount - 1;
      }

      let collection_id = cartItem.id;
      const productRef = await doc(db, "cartproducts", collection_id);
      await updateDoc(productRef, {
        product_amount: Number(amount),
      });
    }
    if (amount === 0) {
      let collection_id = cartItem.id;
      const productRef = await doc(db, "cartproducts", collection_id);
      await updateDoc(productRef, {
        product_amount: 1,
      });
    }
  };

  // Remove product from cart!!!
  const handleRemove = async (id) => {
    console.log("handle remove", id);
    let temp_id = id.product_id;
    // delete cartproduct.

    const q = await query(
      collection(db, "cartproducts"),
      where("product_id", "==", temp_id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      deleteDoc(doc.ref);
    });
    // localStorage.setItem("cartproducts", JSON.stringify(querySnapshot));
  };

  const handlePrice = () => {
    let ans = 0;
    cartProducts.map(
      (cartProducts) =>
        (ans += cartProducts.product_amount * cartProducts.productPrice)
    );
    setPrice(Math.round(ans));
    console.log("this is total data", price);
  };

  return (
    <div
      style={{
        color: state.shades.secondary,
        backgroundColor: state.shades.primary,
        // candidateapplicationrowcard
        // candidateapplication
      }}
    >
      <Grid container>
        <Grid item xs={8} md={4} lg={12} margin="auto">
          {cartProducts && cartProducts.length === 0 ? (
            <div>Your Cart Is Empty</div>
          ) : cartProducts && cartProducts.length > 0 ? (
            <div>
              {cartProducts.map((cartProducts, i) => {
                return (
                  <Cart
                    key={i}
                    handleChange={handleChange}
                    handleRemove={handleRemove}
                    handlePrice={handlePrice}
                    price={price}
                    cartProducts={cartProducts}
                  />
                );
              })}
            </div>
          ) : state.mode === "dark" ? (
            <div
              style={{
                width: "90%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <img
                width="40%"
                src={loadingPrimarycolorThem}
                alt="Loading Cart Items"
              />
            </div>
          ) : (
            <div>
              <img width="40%" src={loadingGif} alt="Loading Cart Items" />
            </div>
          )}
        </Grid>
        <Grid item xs={8} md={4} lg={4} margin=" 2rem auto">
          {" "}
          <div
            className="total-price"
            style={{
              color: state.shades.secondary,
              // backgroundColor: state.shades.candidateapplicationrowcard,
              // candidateapplicationrowcard
              // candidateapplication
              marginTop: "5px",
            }}
          >
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold">{price}$</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CartPage;
