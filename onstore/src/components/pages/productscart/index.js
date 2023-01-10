import React, { useEffect, useState } from "react";
import loadingGif from "../../../assets/loading.gif";
// import ItemCard from "./ItemCard";
import { Notification } from "../../../utils/Notifications";
import Cart from "./Cart";
import {
  query,
  where,
  collection,
  getDocs,
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
  let customer_id = userInfo.uid;
  let customer_name = userInfo.displayName;
  let user_id = userInfo.uid;
  console.log(user_id);

  const fetchData = async () => {
    const q = await query(
      collection(db, "cartProducts"),
      where("customer_id", "==", customer_id)
    );
    try {
      const querySnapshot = await getDocs(q);
      let tempProducts = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tempProducts.push(doc.data());
      });
      setCartProducts(tempProducts);
      console.log(tempProducts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (item, d) => {
    console.log(item, "changedasdasdasd ");
  };

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
