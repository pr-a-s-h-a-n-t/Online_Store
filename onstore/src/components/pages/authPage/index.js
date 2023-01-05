import "./Auth.css";
import React from "react";
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
export default function UserAuth() {
  const navigateUser = useNavigate();

  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigateUser("/profile");
        console.log(result, "result ");
      })
      .catch((error) => {
        console.log(error);
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
