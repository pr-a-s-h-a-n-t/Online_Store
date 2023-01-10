import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/index";
import React from "react";
import "firebase/compat/firestore";

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
        createdAt: new Date(),
      });
      await setDoc(doc(citiesRef, "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        capital: false,
        population: 3900000,
        regions: ["west_coast", "socal"],
        createdAt: new Date(),
      });
      await setDoc(doc(citiesRef, "DC"), {
        name: "Washington, D.C.",
        state: null,
        country: "USA",
        capital: true,
        population: 680000,
        regions: ["east_coast"],
        createdAt: new Date(),
      });
      await setDoc(doc(citiesRef, "TOK"), {
        name: "Tokyo",
        state: null,
        country: "Japan",
        capital: true,
        population: 9000000,
        regions: ["kanto", "honshu"],
        createdAt: new Date(),
      });
      await setDoc(doc(citiesRef, "BJ"), {
        name: "Beijing",
        state: null,
        country: "China",
        capital: true,
        population: 21500000,
        regions: ["jingjinji", "hebei"],
        createdAt: new Date(),
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
      collection(db, "cities"),
      where("capital", "==", true)
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

  let deleteData = async () => {
    let pp = 2;
    const q = await query(
      collection(db, "cartproducts"),
      where("product_id", "==", "pp")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      deleteDoc(doc.ref);
    });
  };

  let updateData = async () => {
    let pp = 2;
    // const q = await query(
    //   collection(db, "cartproducts"),
    //   where("product_id", "==", pp)
    //   )
    //   const cityRef = q;

    //   // await updateDoc(q, {
    //   //   status: "changed"
    //   //  })
    //   //  console.log("doc has been updated")

    // // Remove the 'capital' field from the document
    // await updateDoc(cityRef, {
    //   status: deleteField()
    // });
    let temp = {
      name: " ",
      state: "",
      country: "",
      updated: "",
    };
    // const q = await query(
    //   collection(db, "cartproducts"),
    //   where("product_id", "==", pp)
    //   )
    const citiesRef = collection(db, "cities");

    // Create a query against the collection.
    const q = query(citiesRef, where("state", "==", "CA"));
    // q.function(snapshot) {
    //   snapshot.ref.update({ state: "New trainer" })
    // });
    // await setDoc(doc(db, "cities", "LA"), {
    //   ...temp,
    //   // name: "apple",
    //   // state: "CA",
    //   // country: "india",
    //   updated: "2019",
    // });
    const docRef = doc(db, "cities", "LA");

    const data = {
      title: " newest",
      provinceName: "British Columbia",
      countryCode: "CA",
    };
    // { merge:true }
    setDoc(
      docRef,
      {
        ...data,
        status: "changed again",
      },
      { merge: true }
    )
      .then((docRef) => {
        console.log("Entire Document has been updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
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
          backgroundColor: "blue",
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
      <button
        style={{
          width: "40%",
          height: "10%",
          marginTop: "10%",
          backgroundColor: "red",
        }}
        onClick={deleteData}
      >
        Delete Data
      </button>
      <button
        style={{
          width: "40%",
          height: "10%",
          marginTop: "10%",
          backgroundColor: "yellow",
        }}
        onClick={updateData}
      >
        Updata Data
      </button>
    </div>
  );
}

export default TestFile;
