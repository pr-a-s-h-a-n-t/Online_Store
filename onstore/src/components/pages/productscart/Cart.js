import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Cart.css";
import shoppingBasket from "../../../assets/shoppingBasket.png";
import { DarkmodeContext } from "../../../contex/darkmode/index";

const Cart = ({
  cartProducts,
  handleRemove,
  price,
  setCartProducts,
  handleChange,
}) => {
  // const [price, setPrice] = useState(0);
  const [state, dispatch] = React.useContext(DarkmodeContext);

  // console.log(
  //   cartProducts.product_amount,
  //   cartProducts.product_price,
  //   "this data is needed"
  // );

  // const handlePrice = async() => {
  //   let ans = 0;
  //   cartProducts.map(
  //     (cartProducts) =>
  //       (ans += cartProducts.product_amount * cartProducts.productPrice)
  //   );
  //   setPrice(ans);
  // };

  // const handleRemove = (id) => {
  //   // console.log(id);
  //   const arr = cartProducts.filter((item) => item.product_id !== id);
  //   setCartProducts(arr);
  // };

  // useEffect(() => {
  //   async handlePrice();
  // });

  return (
    <Grid
      container
      paddingTop={2}
      width="100%"
      style={{
        color: state.shades.secondary,
        backgroundColor: state.shades.primary,
        // candidateapplicationrowcard
        // candidateapplication
      }}
    >
      <div
        style={{
          color: state.shades.secondary,
          backgroundColor: state.shades.candidateapplication,
          padding: "1rem",
          // candidateapplicationrowcard
          // candidateapplication
        }}
        className="container"
      >
        <Grid rowSpacing={2} container className="cart_box">
          <Grid item xs={12} md={12} lg={5} columnGap={1} className="cart_img">
            <img alt="" src={cartProducts.productImage} />
            <Grid item xs={12} md={5} lg={8} className="cart_para">
              <p>{cartProducts.productName}</p>
            </Grid>
          </Grid>

          <Grid
            // item
            item
            xs={12}
            md={6}
            lg={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="contained"
              sx={{
                color: "inherit",
                fontWeight: "bold",
                marginRight: "10px",
                backgroundColor: "inherit",
              }}
              onClick={() => {
                handleChange(cartProducts, +1);
                console.log("this is cart products", cartProducts);
              }}
            >
              +
            </Button>
            <Typography fontWeight="bold">
              {cartProducts.product_amount}
            </Typography>
            <Button
              sx={{
                color: "inherit",
                fontWeight: "bold",
                marginLeft: "10px",
                backgroundColor: "inherit",
              }}
              variant="contained"
              onClick={() => handleChange(cartProducts, -1)}
            >
              {" "}
              -
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <h1>{cartProducts.productPrice}$</h1>
            <Grid item xs={12}>
              <Button
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "red",
                }}
                variant="contained"
                onClick={() => handleRemove(cartProducts)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* ))} */}
      </div>
      <Grid item xs={8} md={4} lg={4} margin="auto">
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
  );
};

export default Cart;
