import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig/index";
import React from "react";

function TestFile() {
  const citiesRef = collection(db, "cities");

  async function dataUpload() {
    console.log("Uploading data...");
    try {
      await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco",
        state: "CA",
        country: "USA",
        capital: false,
        population: 860000,
        regions: ["west_coast", "norcal"],
      });
      await setDoc(doc(citiesRef, "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        capital: false,
        population: 3900000,
        regions: ["west_coast", "socal"],
      });
      await setDoc(doc(citiesRef, "DC"), {
        name: "Washington, D.C.",
        state: null,
        country: "USA",
        capital: true,
        population: 680000,
        regions: ["east_coast"],
      });
      await setDoc(doc(citiesRef, "TOK"), {
        name: "Tokyo",
        state: null,
        country: "Japan",
        capital: true,
        population: 9000000,
        regions: ["kanto", "honshu"],
      });
      await setDoc(doc(citiesRef, "BJ"), {
        name: "Beijing",
        state: null,
        country: "China",
        capital: true,
        population: 21500000,
        regions: ["jingjinji", "hebei"],
      });

      console.log("success data has been uploaded");
    } catch (err) {
      console.log(err);
    }
  }

  //   this file is to practice how to add data to firebase and
  //  how to fetch data from firebase .
  // Never add space at starting and ending of  collection name becz firebase will not able to
  // detect the collection name while fetching,  the data adding process will work but, you will not able to fetch data.

  const getData = async () => {
    console.log("Getting data...");
    let userInfo = JSON.parse(localStorage.getItem("user"));
    let customer_id = userInfo.uid;
    let customer_name = userInfo.displayName;
    let product_id = 1;
    let name = "Beijing";
    console.log("Customer_name: " + customer_name, "customer_id", customer_id);
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <button
        style={{
          width: "40%",
          height: "10%",
          backgroundColor: "black",
        }}
        onClick={dataUpload}
      >
        UpLoadData
      </button>
      <button
        style={{
          width: "40%",
          height: "10%",
          marginTop: "10%",
          backgroundColor: "green",
        }}
        onClick={getData}
      >
        Get Data
      </button>
    </div>
  );
}

export default TestFile;
