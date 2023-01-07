import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Cart.css";
import shoppingBasket from "../../../assets/shoppingBasket.png";
import { DarkmodeContext } from "../../../contex/darkmode/index";

const Cart = ({ data, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [state, dispatch] = React.useContext(DarkmodeContext);

  const cart = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    // handlePrice();
  };

  useEffect(() => {
    handlePrice();
  });

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
            <img alt="" src={data.product_image} />
            <Grid item xs={12} md={5} lg={8} className="cart_para">
              <p>{data.product_title}</p>
            </Grid>
          </Grid>

          <Grid
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
              onClick={() => handleChange()}
            >
              +
            </Button>
            <Typography fontWeight="bold">{data.product_amount}</Typography>
            <Button
              sx={{
                color: "inherit",
                fontWeight: "bold",
                marginLeft: "10px",
                backgroundColor: "inherit",
              }}
              variant="contained"
              onClick={() => handleChange()}
            >
              {" "}
              -
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <h1>{data.product_price}$</h1>
            <Grid item xs={12}>
              <Button
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "red",
                }}
                variant="contained"
                onClick={() => handleRemove()}
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
          <Typography fontWeight="bold">000000000</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Cart;
