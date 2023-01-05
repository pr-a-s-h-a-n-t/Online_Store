import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Cart.css";
import shoppingBasket from "../../../assets/shoppingBasket.png";

const Cart = ({ setCart, handleChange }) => {
  const [price, setPrice] = useState(0);

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
      sx={{
        border: "1px solid red",
      }}
    >
      <Grid item xs={12} sm={6} className="cart_box"></Grid>
      <div className="container">
        {cart?.map((item) => (
          <Grid
            container
            // xs={12} md={12} lg={12}
            className="cart_box"
            key={item.id}
          >
            <Grid item xs={12} md={12} lg={3} className="cart_img">
              <img alt="" src={shoppingBasket} />
              <p>"Product Name"</p>
            </Grid>
            {/* <Grid
            container
            sx={{
                border: '1px solid black',
            }}
          > */}
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
                  color: "green",
                  fontWeight: "bold",
                  marginRight: "10px",

                  backgroundColor: "white",
                }}
                onClick={() => handleChange(item, +1)}
              >
                +
              </Button>
              <Typography fontWeight="bold">"Quantity"</Typography>
              <Button
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  backgroundColor: "white",
                }}
                variant="contained"
                onClick={() => handleChange(item, -1)}
              >
                {" "}
                -
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <h1>"4000$"</h1>
              <Grid item xs={12}>
                <Button
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    // margin: "10px",

                    backgroundColor: "red",
                  }}
                  variant="contained"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </div>
      <Grid item xs={12} lg={4}>
        {" "}
        <div
          className="total-price"
          style={{
            border: "1px solid white",
            width: "90%",
            height: "5rem",
            margin: "auto",
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
