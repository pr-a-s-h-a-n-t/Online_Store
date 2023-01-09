import "./Auth.css";
import React, { useState, useEffect, useDebugValue } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//  import setDoc , getDoc, db from firebase
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig/index";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Grid } from "@mui/material";
import { auth } from "../../../firebaseConfig/index";
import GoogleLogo from "../../../assets/GoogleLogo.png";
import { Notification } from "../../../utils/Notifications";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { async } from "@firebase/util";
export default function UserAuth() {
  const [customerData, setCustomerData] = useState({
    userName: "",
    userEmail: "",
    userImage: "",
    userPhone: "",
  });

  const navigateUser = useNavigate();

  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const uid = user.uid;
        localStorage.setItem("user", JSON.stringify(user));
        // navigateUser("/profile");

        // we cant do this directly because state will not update it will show
        // previous set values ex(
        // in customerData i have set initial value userName: "",userEmail: "",userImage: "",userPhone: "",
        // so this values will not update in firestore because this is how
        // react stat works.
        // ******* Important********
        // we are creating new object and then assiging this value to
        // setUserData .
        // After that uploading   userData to firestore with collection name user userInfo.

        //
        const userData = {
          userName: user.displayName,
          userEmail: user.email,
          userImage: user.photoURL,
        };
        setCustomerData(userData);
        console.log("user data has been saved in local state", userData);

        // check if user is already present in firestore db
        // then navigate to profile page.
        if (user) {
          let docRef = doc(db, "userInfo", uid);
          getDoc(docRef).then(async (doc_) => {
            // console.log(doc);
            if (doc_.exists()) {
              console.log(
                "no need to set data user already exists i am redirecting him to profile page  "
              );
              navigateUser("/profile");
            } else {
              try {
                await setDoc(doc(db, "userInfo", uid), {
                  ...userData,
                  type: "customer",
                });
                Notification({
                  message: "profile created successfully",
                  type: "success",
                });
                navigateUser("/profile");
                // console.log("data saved in firebase", userData);
                console.log(
                  "I set the user data and navigated him to profile page",
                  userData
                );
              } catch (err) {
                console.log(err);
                Notification({
                  message: "something went wrong",
                  type: "danger",
                });
              }
            }
          });
        } else {
          Notification({
            message: "something went wrong",
            type: "danger",
          });
        }
        console.log(result, "result ");
      })
      .catch((error) => {
        console.log(error);
        Notification({ message: "something went wrong", type: "danger" });
      });
  };

  return (
    <Grid container display="flex" flexDirection="column" marginTop="4rem">
      <Grid
        item
        sm={12}
        // md={12}
        style={{
          maxWidth: "80%",
          // height: "100%",
          margin: "auto",
          boxShadow: "border-box",
        }}
      >
        <img
          style={{
            width: "clamp(8rem, 80vw, 80%)",
            height: "50vh",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
          src={GoogleLogo}
          alt="Google Logo"
        />
      </Grid>
      <Grid item sm={12} md={12}>
        <Button
          onClick={signIn}
          variant="contained"
          className="google-button"
          sx={{
            width: "30%",
            height: "100%",
            backgroundColor: "aquaLightGray",
            color: "purple",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GoogleIcon className="google-logo" />
        </Button>
      </Grid>
    </Grid>
  );
}
