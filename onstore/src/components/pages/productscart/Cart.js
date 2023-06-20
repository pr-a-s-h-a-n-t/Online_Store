import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { DarkmodeContext } from "../../../contex/darkmode/index";
import shoppingBasket from "../../../assets/shoppingBasket.png";
import "./Cart.css";

const Cart = ({ cartProducts, handleRemove, handlePrice, handleChange }) => {
  const [state] = React.useContext(DarkmodeContext);

  useEffect(() => {
    handlePrice();
  }, []);

  if (!cartProducts) {
    return <div>Loading cart...</div>;
  }

  if (cartProducts.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <Grid
      container
      paddingTop={2}
      width="100%"
      style={{
        color: state.shades.secondary,
        backgroundColor: state.shades.primary,
      }}
    >
      <div className="container">
        {cartProducts.map((cartProduct) => (
          <Grid
            key={cartProduct.productId}
            rowSpacing={2}
            container
            className="cart_box"
          >
            <Grid
              item
              xs={12}
              md={12}
              lg={5}
              columnGap={1}
              className="cart_img"
            >
              <img alt="" src={cartProduct.productImage} />
              <Grid item xs={12} md={5} lg={8} className="cart_para">
                <p>{cartProduct.productName}</p>
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
                onClick={() => {
                  handleChange(cartProduct, +1);
                  console.log("this is cart product", cartProduct);
                }}
              >
                +
              </Button>
              <Typography fontWeight="bold">
                {cartProduct.product_amount}
              </Typography>
              <Button
                sx={{
                  color: "inherit",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  backgroundColor: "inherit",
                }}
                variant="contained"
                onClick={() => handleChange(cartProduct, -1)}
              >
                {" "}
                -
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <h1>{cartProduct.productPrice}$</h1>
              <Grid item xs={12}>
                <Button
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "red",
                  }}
                  variant="contained"
                  onClick={() => handleRemove(cartProduct)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </div>
    </Grid>
  );
};

export default Cart;
