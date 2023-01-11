import React, { useState, useEffect } from "react";
import { DarkmodeContext } from "../../../../contex/darkmode/index";
import loadingGif from "../../../../assets/loading.gif";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard/index";
//  import Card from "../Testproduct/Card";
import loadingPrimarycolorThem from "../../../../assets/loadingPrimarycolorThem.gif";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig/index";
import { v4 as uuid } from "uuid";
import { Notification } from "../../../../utils/Notifications";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
function Products() {
  const [state, dispatch] = React.useContext(DarkmodeContext);
  const navigateUser = useNavigate();
  const [store, setStore] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    mystore();
    // fetchData();
  }, []);

  const mystore = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    // const res = await fetch("https://api.escuelajs.co/api/v1/products ");

    // https://api.escuelajs.co/api/v1/products

    const jsondata = await res.json();
    jsondata.forEach((object) => {
      object.amount = 1;
    });
    setStore(jsondata);
  };

  const fetchData = async () => {
    const q = query(collection(db, "cart "));
    const querySnapshot = await getDocs(q);
    let addedProducts = [];
    querySnapshot.forEach((doc) => {
      addedProducts.push(doc.data());
    });
    setCartProducts(addedProducts);
  };

  // console.log(store);
  // console.log("added products in database", cartProducts);

  let addToCart = async (cartItem) => {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    if (userInfo) {
      let customer_id = userInfo.uid;
      let customer_name = userInfo.displayName;
      let product_id = uuid();

      let docRef = doc(db, "userInfo", customer_id);
      await getDoc(docRef).then(async (doc) => {
        // console.log(doc);
        if (doc.exists()) {
          if (cartItem) {
            try {
              let product = uuid();

              // const q =  query(
              //   collection(db, "cartproducts"),
              //   where("product_id", "==", cartItem.id)
              // );

              const q = query(
                collection(db, "cartproducts"),
                where("product_id", "==", cartItem.id)
              );
              let productsCheck;
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " sssss=> ", doc.data());
                productsCheck = doc.data();
              });

              if (productsCheck) {
                Notification({
                  message: "Already Added to Cart ",
                  type: "danger",
                });
              } else {
                addDoc(collection(db, "cartproducts"), {
                  product_id: cartItem.id,

                  product_amount: cartItem.amount,
                  productName: cartItem.title,
                  productPrice: cartItem.price,
                  productImage: cartItem.image,
                  productCategory: cartItem.category,
                  customer_id,
                  customer_name,
                  createdAt: new Date(),
                  status: "added",
                });
                Notification({
                  message: "Added to Cart ",
                  type: "success",
                });
              }
            } catch (err) {
              console.log(err);
              Notification({
                message: "some thing went wrong",
                type: "danger",
              });
            }

            // Notification({
            //   message: "Added to Cart ",
            //   type: "success",
            // });
          }
        } else {
          navigateUser("/auth");
          Notification({
            message: "something is wrong Please Login",
            type: "warning",
          });
        }
      });
    } else {
      navigateUser("/auth");
      Notification({
        message: "User not found Please Login",
        type: "warning",
      });
    }
  };

  return (
    <>
      <h1
      style={{
        // border: "1px solid red",
        marginTop: "2rem",
       fontSize:" clamp(30px, 10vw, 6rem)",

        
      }}
      >All Products</h1>

      {store && store.length === 0 ? (
        state.mode === "dark" ? (
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
              width="100%"
              src={loadingPrimarycolorThem}
              alt="Loading Cart Items"
            />
          </div>
        ) : (
          <div>
            <img width="100%" src={loadingGif} alt="Loading Cart Items" />
          </div>
        )
      ) : store && store.length > 0 ? (
        <div
          style={{
            color: state.shades.secondary,
            backgroundColor: state.shades.primary,
          }}
          className="onePlateform-container"
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            {store.map((product, i) => (
              <ProductCard key={i} product={product} addToCart={addToCart} />
            ))}
          </Grid>
        </div>
      ) : (
        <div>No Products</div>
      )}
    </>
  );
}

export default Products;
