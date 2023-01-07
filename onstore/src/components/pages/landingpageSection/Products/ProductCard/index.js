import { Button, Grid } from "@mui/material";
import React from "react";
import "./ProductCard.css";
import { DarkmodeContext } from "../../../../../contex/darkmode/index";
import Notification from "../../../../../utils/Notifications";
function SolutionCard({ product, addToCart }) {
  const [state, dispatch] = React.useContext(DarkmodeContext);
  // console.log("this is a prop product",product );

  return (
    <Grid
      sx={{
        color: state.shades.secondary,
        backgroundColor: state.shades.primary,
      }}
      item
      xs={12}
      sm={8}
      md={4}
    >
      <div
        style={{
          color: state.shades.secondary,
          backgroundColor: state.shades.solutionCardBackground,
        }}
        className="solutionCard-container"
      >
        <div className="img-container">
          <img
            style={{ marginRight: "10px", maxWidth: "10rem" }}
            alt="icon"
            src={product.image}
          />
        </div>
        <Grid container>
          <div className="card-details">
            <div className="title">{product.title}</div>
            <div className="price">Price- {product.price}$</div>
            <div className="rating-btn-container">
              <Grid item sm={12}>
                <span className="rating-span">{product.rating.rate}⭐ </span>
                <span className="review-span">
                  {product.rating.count} Ratings
                </span>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <Button
                  sx={{
                    color: "inherit",
                    backgroundColor: "orange",
                    fontWeight: "bold",
                    // marginRight: "8px",
                    width: "100%",
                  }}
                  onClick={( ) =>{
                    console.log("productsssss", product );
                    addToCart(product)
                    }
                    }
                >
                  Add To Cart
                </Button>
                {/* <div>{description}</div> */}
              </Grid>
            </div>
          </div>
        </Grid>
      </div>
    </Grid>
  );
}

export default SolutionCard;
