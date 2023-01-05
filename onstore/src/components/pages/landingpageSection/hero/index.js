import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";

import girlImg from "../../../../assets/girlImg.jpg";
import "./Hero.css";
import shoppingGirl from "../../../../assets/shoppingGirl.png";
import shoppingBasket from "../../../../assets/shoppingBasket.png";

import { motion } from "framer-motion";
import Confetti from "react-confetti";

function Hero() {
  const [celebrations, setCelebrations] = React.useState(false);

  useEffect(() => {
    setCelebrations(true);
    setTimeout(() => {
      setCelebrations(false);
    }, 10000);

    //  return setCelebrations(false);
  }, []);

  return (
    <>
      {celebrations ? (
        <Confetti
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.closePath();
          }}
        />
      ) : (
        ""
      )}

      <div className="flex-wrapper">
        <div className="heading-container">
          <motion.h1
            className="big-heading"
            animate={{ rotate: -370 }}
            transition={{ type: " spring ", duration: 1 }}
          >
            <span className="stroke">
              <span>New</span> Year
            </span>
            <br />
            <span className="sale">Sale</span>
          </motion.h1>
        </div>

        <div className="img-box">
          <motion.img
            src={shoppingBasket}
            className="shoppingBasket"
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              type: "smooth",
              repeatType: "mirror",
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Hero;
