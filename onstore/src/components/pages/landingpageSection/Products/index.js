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
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig/index";
import { v4 as uuid } from "uuid";
import { Notification } from "../../../../utils/Notifications";
import { useNavigate } from "react-router-dom";
function Products() {
  const [state, dispatch] = React.useContext(DarkmodeContext);
const navigateUser = useNavigate();
  const [store, setStore] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  // const [tempData, setTempData] = useState([
  //   {
  //     product_id :"",
  //     apiDefaultProduct_id: "",
  //     customer_id: "",

  //     // status: "added",
  //     // createdAt: new Date(),
  //     product_title:""  ,
  //     product_price:  "",
  //     product_amount:""  ,
  //     product_image:  "",
  //     customer_name: "",
  //     customer_email: "",
  //   },
  // ]);

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

  // const fetchData = async () => {
  //   const q = query(collection(db, "cartproducts"));
  //   const querySnapshot = await getDocs(q);
  //   let addedProducts = [];
  //   querySnapshot.forEach((doc) => {
  //     addedProducts.push(doc.data());
  //   });
  //   setCartProducts(addedProducts);
  // };

  // console.log(store);
  console.log("added products in database", cartProducts);

  let addToCart = async (cartItem) => {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      let customer_id = userInfo.uid;
      let product_id = uuid();
      // let job_id = uuidv4();
      console.log(userInfo);
      console.log(cartItem, "added to cart");

      // let product_id = uuid();

      if (cartItem) {
        try {
          // fetch the customer info from the customer collection
          const customer = await getDoc(doc(db, "userInfo", customer_id));
          console.log(customer.data(), "ssss this is a customer info");
          let customer_name = customer.data().userName;
          let customer_email = customer.data().userEmail;
          // let customer_name=customer.data().name;
          let product_id = uuid();
          // let product_details = [
          //   {
          //     product_id,
          //     apiDefaultProduct_id: "",
          //     customer_id: "",

          //     // status: "added",
          //     // createdAt: new Date(),
          //     product_title:""  ,
          //     product_price:  "",
          //     product_amount:""  ,
          //     product_image:  "",
          //     customer_name,
          //     customer_email,
          //   },
          // ];
          // setTempData((data) => [{
          //   // ...data,
          //   product_id  ,
          //   apiDefaultProduct_id: cartItem.id,
          //   customer_id: customer_id,

          //   status: "added",
          //   createdAt: new Date(),
          //   product_title: cartItem.title,
          //   product_price: cartItem.price,
          //   product_amount: cartItem.amount,
          //   product_image: cartItem.image,
          //   customer_name,
          //   customer_email,
          // }])
          // console.log("this is a temporary data store" ,tempData)

          await setDoc(doc(db, "cartproducts", customer_id), {
            //  ...tempData,
            product_id,
            apiDefaultProduct_id: cartItem.id,
            customer_id: customer_id,

            status: "added",
            createdAt: new Date(),
            product_title: cartItem.title,
            product_price: cartItem.price,
            product_amount: cartItem.amount,
            product_image: cartItem.image,
            customer_name,
            customer_email,
          });
        } catch (err) {
          console.log(err);
          Notification({
            message: "some thing went wrong",
            type: "danger",
          });
        }

        Notification({
          message: "Added to Cart ",
          type: "success",
        });
      }
    }
    else{
      navigateUser("/auth");
      Notification({
        message: "User not found Please Login",
        type: "warning",
      })
    }
    // console.log(
    //   "this product is added to cart",
    //   cartItem.name,
    //   cartItem.title,
    //   cartItem.price,
    //   cartItem.amount,
    //   cartItem.image
    // );
  };

  return (
    <>
      <h1>Our Products</h1>

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
