import React from 'react'
import girlImg from "../../../../assets/girlImg.jpg"
import "./Hero.css"
import shoppingGirl from "../../../../assets/shoppingGirl.png"
import shoppingBasket from "../../../../assets/shoppingBasket.png"

function Hero() {
  return (
    <div  className="section4-main">
    <div>
       <h1> Sale is Live </h1>
       <img src={shoppingBasket} alt="" />
    </div>
    
    </div>

  )
}

export default Hero