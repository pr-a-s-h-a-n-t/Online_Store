import React, { useState, useEffect } from "react";
import { DarkmodeContext } from "../../../../contex/darkmode/index";
import loadingGif from "../../../../assets/loading.gif";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard/index";
//  import Card from "../Testproduct/Card";
import loadingPrimarycolorThem from "../../../../assets/loadingPrimarycolorThem.gif";

function Products() {
  const [state, dispatch] = React.useContext(DarkmodeContext);
  const dataList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  const [store, setStore] = useState([]);
  useEffect(() => {
    mystore();
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

  console.log(store);


  const handleClick = (cartItem) => {
    // let isPresent = false;
    // cart.forEach((product) => {
    //   if (item.id === product.id)
    //     isPresent = true;
    // })
    // if (isPresent) {
    //   setWarning(true);
    //   alert("Item is already added to your cart")
    //   setTimeout(() => {
    //     setWarning(false);
    //   }, 2000);
    //   return;
    // }
    // setCart([...cart, item]);
    console.log("this product is added to cart", cartItem);
  }


















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
              <ProductCard
                key={i}
                product={product}
              
                handelClick={handleClick}
              />
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
