import React, { useEffect, useState } from "react";
import loadingGif from "../../../assets/loading.gif";
// import ItemCard from "./ItemCard";
import { Notification } from "../../../utils/Notifications";
import Cart from "./Cart";
import {
  query,
  where,
  collection,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig/index";
import { v4 as uuid } from "uuid";
import { DarkmodeContext } from "../../../contex/darkmode/index";

function CartPage() {
  const [state, dispatch] = React.useContext(DarkmodeContext);
  const [cartProducts, setCartProducts] = useState([]);

  // fetch data from database
  let userInfo = JSON.parse(localStorage.getItem("user"));
  // if (userInfo) {
  let product_id = userInfo.uid;

  const fetch = () => {
    // fetch all the docs in applications collection where employerId === current user id

    const q = query(
      collection(db, "cartproducts"),
      where("product_id", "==", product_id)
    );

    //subscribe to the query
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let cartProducts = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        cartProducts.push(doc.data());
      });
      setCartProducts(cartProducts);
      console.log("this product is added to cart", cartProducts);
    });
  };

  // const cartProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    fetch();
  }, []);


  const handleChange = (item, d) => {
    console.log(item, "changed sssssssssssssssssssssssssssssssssssss")
    let ind = -1;
    cartProducts.forEach((data, index) => {
      if (data.id === item.id)
        ind = index;
    });
    const tempArr = cartProducts;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0)
      tempArr[ind].amount = 1;
      setCartProducts([...tempArr])
      console.log("temp assrrrrr",tempArr,
      "new card products" ,cartProducts
      )
      
            
  }

  return (
    <div
      style={{
        color: state.shades.secondary,
        backgroundColor: state.shades.primary,
        // candidateapplicationrowcard
        // candidateapplication
      }}
    >
      {cartProducts && cartProducts.length === 0 ? (
        <div>Your Cart Is Empty</div>
      ) : cartProducts && cartProducts.length > 0 ? (
        <div>
          {cartProducts.map((cartProducts, i) => {
            return (
              <Cart
                key={i}
                handleChange={handleChange}
                // data={data}
                cartProducts={cartProducts}
              />
            );
          })}
           
        </div>
      ) : (
        <div>
          <img src={loadingGif} alt="Loading Cart Items" />
        </div>
      )}
    </div>
  );
}

export default CartPage;
