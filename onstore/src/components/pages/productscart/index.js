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
  // if (userInfo) {
  let user_id = userInfo.uid;
  console.log(user_id);
  let customer_name = userInfo.name;

  const fetch = async () => {
    // fetch all the docs in applications collection where employerId === current user id

    // const q = query(
    //   collection(db, "cartproducts"),
    //   where("customer_id", "==", user_id )
    // );

    //subscribe to the query
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   let docs = [];
    //   querySnapshot.forEach((doc) => {
    //     console.log("this is doc data",doc.data());
    //     docs.push(doc.data());
    //   });
    //   setCartProducts(docs);

    // });
    // import { collection, query, where, getDocs } from "firebase/firestore";

    const q = query(
      collection(db, "cartproducts"),
      where("customer_id", "==", user_id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if(doc.data().exists()) {
      console.log(doc.id, " => ", doc.data())}
      else {
        console.log("no data found in this collection")
        
      };
    });
  };

  // const cartProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    fetch();
  }, []);

  // async function handleClick(action, data) {
  //   if (action === "accept") {
  //     //update the status of the application to "accepted"

  //     // a update call to the application collection
  //     setDoc(
  //       doc(db, "applications", data.product_id),
  //       {
  //         status: "accepted",
  //       },
  //       { merge: true }
  //     );
  //     // Notification({
  //     //   type: "success",
  //     //   message: "Application Accepted",
  //     // });
  //     // initialize a conversation between the employer and the candidate

  //     //1. initialize last message in the last_message collection
  //     // hey (candidate name) we  have accepted your application for the job (job title)
  //     //2. initialize the conversation in the conversations collection
  //     // hey (candidate name) we  have accepted your application for the job (job title)

  //     // let conversation_id = uuid();
  //     // let last_message = `Hey ${data.candidate_name} we have accepted your application for the job ${data.jobTitle}`;
  //     // let last_message_id = uuid();
  //     // let conversation_doc_id = uuid();
  //     // await setDoc(doc(db, "last_messages", last_message_id), {
  //     //   last_message,
  //     //   last_message_id,
  //     //   createdAt: new Date(),
  //     //   conversation_id: conversation_id,
  //     //   employer_id: employerId,
  //     //   candidate_id: data.candidate_id,
  //     //   company_name: data.company_name,
  //     //   candidate_name: data.candidate_name,
  //     //   jobTitle: data.jobTitle,
  //     // });

  //     // await setDoc(doc(db, "conversations", conversation_doc_id), {
  //     //   conversation_id,
  //     //   message: last_message,
  //     //   createdAt: new Date(),
  //     //   by: "employer",
  //     //   user_id: employerId,
  //     //   conversation_doc_id,
  //     // });
  //   } else if (action === "reject") {
  //     //delete the application from the collection
  //     // console.log(data);
  //     deleteDoc(doc(db, "applications", data.product_id));
  //     Notification({
  //       type: "danger",
  //       message: "item removed successfully",
  //     });
  //   }
  // }

  const handleChange = (item, d) => {
    console.log(item, "changed sssssssssssssssssssssssssssssssssssss");
    // let ind = -1;
    // cartProducts.forEach((data, index) => {
    //   if (data.id === item.id)
    //     ind = index;
    // });
    // const tempArr = cartProducts;
    // tempArr[ind].amount += d;

    // if (tempArr[ind].amount === 0)
    //   tempArr[ind].amount = 1;
    //   setCartProducts([...tempArr])
    //   console.log("temp assrrrrr",tempArr,
    //   "new card products" ,cartProducts
    //   )
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
