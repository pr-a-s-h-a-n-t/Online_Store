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
  const [price, setPrice] = useState(0);

  // fetch data from database
  let userInfo = JSON.parse(localStorage.getItem("user"));
  let customer_id = userInfo.uid;
  let customer_name = userInfo.displayName;
  let user_id = userInfo.uid;
  // console.log(user_id);

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
      await handlePrice();
      // console.log(tempProducts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData(handlePrice);
  }, []);

  const handleChange = async (cartItem, d) => {
    // console.log("check data",cartItem, d);
    let ind = -1;
    cartProducts.forEach((data, index) => {
      if (data.product_id === cartItem.product_id) {
        ind = index
      };
    });
    const tempArr = cartProducts;
    tempArr[ind].product_amount += d;

    if (tempArr[ind].amount === 0) {
      tempArr[ind].amount = 1;
    }
    // /////////////////////////////////////////////////////////
    let temp = {
      product_id: cartItem.id,
      product_amount: cartItem.amount,
      productName: cartItem.title,
      productPrice: cartItem.price,
      productImage: cartItem.image,
      productCategory: cartItem.category,
      customer_id,
      customer_name,
      createdAt: new Date(),
      status: "added",
    };
    try {
      await setDoc(
        doc(db, "cartProducts",cartItem.product_id),
        {
          ...tempArr

        },
        { merge: true },
        Notification({
          message: "profile created successfully",
          type: "success",
        })
      );
    } catch (err) {
      Notification({ message: "something went wrong" });
    }

    // ///////////////////////////////////////////
    // setCartProducts([...tempArr]);
  };

  const handleRemove = async (id) => {
    console.log(id);
    // delete cart
    // const q = await query(
    //   collection(db, "cartProducts"),
    //   where("product_id", "==",id)
    // )
    // const querySnapshot = await getDocs(q);
    // deleteDoc(doc(db, "cartProducts",id.customer_id));
    // querySnapshot.deleteDoc(doc.ref);

    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());

    const arr = cartProducts.filter(
      (item) => item.product_id !== id.product_id
    );
    setCartProducts(arr);
  };

  const handlePrice = () => {
    let ans = 0;
    cartProducts.map(
      (cartProducts) =>
        (ans += cartProducts.product_amount * cartProducts.productPrice)
    );
    setPrice(ans);
    console.log("this is total data", price);
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
                handleRemove={handleRemove}
                handlePrice={handlePrice}
                price={price}
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
