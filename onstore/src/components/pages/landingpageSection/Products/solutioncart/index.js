import { Grid } from "@mui/material";
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
            style={{ marginRight: "10px", maxWidth: "8rem" }}
            alt="icon"
            src={image}
          />
        </div>
        <div className="solutionCard-title">
          <div>{title}</div>
          <div>{price}</div>
          <span>{rating.rate}</span>
          <span>{rating.count}</span>

          {/* <div>{description}</div> */}
        </div>
      </div>
    </Grid>
  );
}

export default SolutionCard;
