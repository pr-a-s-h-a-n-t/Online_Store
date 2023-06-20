import React, { useEffect, useState } from "react";
import loadingGif from "../../../assets/loading.gif";
import Cart from "./Cart";
import { Grid, Typography } from "@mui/material";
import "./Cart.css";
import loadingPrimarycolorThem from "../../../assets/loadingPrimarycolorThem.gif";

import {
  query,
  where,
  collection,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig/index";
import { DarkmodeContext } from "../../../contex/darkmode/index";
import { reload } from "firebase/auth";

function CartPage() {
  const [state, dispatch] = React.useContext(DarkmodeContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setPrice] = useState(0);

  let userInfo = localStorage.getItem("user");
  let customer_id;
  let customer_name;
  let user_id;
  try {
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      customer_id = parsedUserInfo.uid;
      customer_name = parsedUserInfo.displayName;
      user_id = parsedUserInfo.uid;
    } else {
      console.error("user not found");
    }
  } catch (err) {
    console.error("error parsing user JSON");
  }

  const fetchData = async () => {
    let cart_products = JSON.parse(localStorage.getItem("cartProducts"));

    setCartProducts(cart_products);

    const q = query(
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
        localStorage.setItem("cartProducts", JSON.stringify(myProducts));
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (cartItem, d) => {
    let amount = Number(cartItem.product_amount);
    if (amount >= 1) {
      if (d === 1) {
        amount++;
      }
      if (d === -1) {
        amount = amount - 1;
      }

      const productRef = doc(db, "cartproducts", cartItem.id);
      await updateDoc(productRef, {
        product_amount: Number(amount),
      });
    }
    if (amount === 0) {
      const productRef = doc(db, "cartproducts", cartItem.id);
      await updateDoc(productRef, {
        product_amount: 1,
      });
    }
  };

  const handleRemove = async (id) => {
    let temp_id = id.product_id;

    const q = query(
      collection(db, "cartproducts"),
      where("product_id", "==", temp_id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cartProducts.forEach((cartProduct) => {
      ans += cartProduct.product_amount * cartProduct.productPrice;
    });
    setPrice(Math.round(ans));
  };

  return (
    <div
      style={{
        color: state.shades.secondary,
        backgroundColor: state.shades.primary,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={8} lg={8} margin="auto">
          {cartProducts && cartProducts.length === 0 ? (
            <div>Your Cart Is Empty</div>
          ) : cartProducts && cartProducts.length > 0 ? (
            <div>
              {cartProducts.map((cartProduct, i) => (
                <Cart
                  key={i}
                  handleChange={handleChange}
                  handleRemove={handleRemove}
                  handlePrice={handlePrice}
                  price={price}
                  cartProduct={cartProduct}
                />
              ))}
            </div>
          ) : (
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
                src={
                  state.mode === "dark" ? loadingPrimarycolorThem : loadingGif
                }
                alt="Loading Cart Items"
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={4} lg={4} margin="2rem auto">
          <div
            className="total-price"
            style={{
              color: state.shades.secondary,
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
