import { Button, Grid } from "@mui/material";
import React from "react";
import "./CartPage.css";
import { DarkmodeContext } from "../../../contex/darkmode/index";
import shoppingBasket from "../../../assets/shoppingBasket.png";
import { green } from "@mui/material/colors";

function CandidateJobCard({ job, applyonJob }) {
  const [state, dispatch] = React.useContext(DarkmodeContext);
  // console.log(job);

  return (
    <div
      className="candidate-jobCard"
      style={{
        color: state.shades.secondary,
        backgroundColor: state.shades.candidateapplicationrowcard,
        border: "10px solid green",
        // candidateapplicationrowcard
      }}
    >
      <Grid
        container
        
        sx={{
          border: "5px solid black",
          margin: "5px auto",
        }}
      ><Grid
        container
        
        sx={{
          border: "5px solid black",
          margin: "5px auto",
        }}
      >
        {/* <Grid item xs={3}> */}
        <Grid
          sx={{
            display: {
              // xs: mobileSectionState === "sidebar" ? "block" : "none",
              md: "block",
            },
          }}
          item
          xs={12}
          md={4}
        >
          <img
            width="60%"
            style={{
              maxWidth: "90px",
              border: "3px solid grey",
              borderRadius: " 100%",
            }}
            src={shoppingBasket}
            alt="company logo"
          />
        </Grid>
        <Grid sx={{ textAlign: "left" }} item xs={9}>
          <h1>"Hand Bag"</h1>
          <h2> "very Handy and user"</h2>
        </Grid>
      </Grid>

      <Grid className="candidate-jobCard_details" container spacing={1}>
        <Grid item xs={12} md={2}>
          " jobTitle"
        </Grid>
        <Grid item xs={2}>
          "Location"
        </Grid>
        <Grid item xs={6} md={3}>
          "salary" "min" - "max"
        </Grid>
        <Grid item xs={3} md={3}>
          "data"
        </Grid>
        <Grid item xs={12} md={2}>
          <button
            onClick={() => {
              applyonJob(job);
            }}
            className="candidate-apply-btn"
          >
            Remove
          </button>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CandidateJobCard;
