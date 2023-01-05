import React, { useEffect, useState } from "react";
import loadingGif from "../../../assets/loading.gif"
 
 
import ItemCard from "./ItemCard";
 
import { Notification } from "../../../utils/Notifications";
import Cart from "./Cart";



function CandidateJobs() {
const cartItems = [ 1,2,3,4,5,6,7,8,9,10 ]  
  return (
    <div>
      {cartItems && cartItems.length === 0 ? (
        <div>Your Cart Is Empty</div>
      ) : cartItems && cartItems.length > 0 ? (
        <div>
          {/* {cartItems.map((job, i) => {
            return (
              <ItemCard key={i} cartItems={cartItems} job={job} />
            );
          })} */}
          <Cart />
        </div>
      ) : (
        <div><img  src={loadingGif} alt="Loading Cart Items" /></div>
      )}
    </div>
  );
}

export default CandidateJobs;
