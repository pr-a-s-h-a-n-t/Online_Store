import { Button, Grid } from "@mui/material";
import React from "react";
import "./SolutionCard.css";
import { DarkmodeContext } from "../../../../../contex/darkmode/index";

function SolutionCard({ title, description, icon, price, rating, image }) {
  const [state, dispatch] = React.useContext(DarkmodeContext);

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
            src={image}
          />
        </div>
        <Grid container>
          <div className="card-details">
            <div className="title">{title}</div>
            <div className="price">Price- {price}$</div>
            <div className="rating-btn-container">
              {/* <span>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                  fill="#FFAC4B"
                />
              </svg>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                  fill="#FFAC4B"
                />
              </svg>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                  fill="#FFAC4B"
                />
              </svg>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                  fill="#FFAC4B"
                />
              </svg>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                  fill="#FFAC4B"
                />
              </svg>
            </span> */}

              <Grid item sm={12}  >
                <span className="rating-span">{rating.rate}⭐ </span>
                <span className="review-span">{rating.count} Ratings</span>
              </Grid>
              <Grid item sm={12} md={12} lg={12}
               >
                <Button
                  sx={{
                    color: "inherit",
                    backgroundColor: "orange",
                    fontWeight: "bold",
                    // marginRight: "8px",
                    width: "100%",
                  }}
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
