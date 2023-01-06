import { Notification } from "../../../utils/Notifications";

import { Label, SettingsSuggestRounded } from "@mui/icons-material";
import { Button, Divider, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth, storage } from "../../../firebaseConfig/index";
import UserAuth from "../authPage/index";
import "./Profile.css";

import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { async } from "@firebase/util";
// import loadinglogo from " ../../../src/assets/loadingLogo.gif";
// import loadingDark from " ../../../src/assets/loadingDark.gif";

import { DarkmodeContext } from "../../../contex/darkmode/index";
// import UserAuth from "../authPage";

function Profile() {
  const [state, dispatch] = React.useContext(DarkmodeContext);

  const navigateUser = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const uid = user.uid;
  const [uploadLoading, setUploadLoading] = useState(0);
  let inputRef = React.createRef();
  const [disableField, setDisableField] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userCheck, setUserCheck] = useState(false);
  const [values, setValues] = useState({
    //should be fetched from firestore if the user has already created a profile

    userName: "",
    userEmail: "",
    userPhone: "",
    userImage: "",
  });

  useEffect(() => {
    //fetch data from firestore
    //if data exists then set the values
    setLoading(true);
    let user = JSON.parse(localStorage.getItem("user"));

    // try(

    // ).catch(err => {console.log(err)});

    if (user) {
      let uid = user.uid;
      let docRef = doc(db, "userInfo", uid);
      getDoc(docRef).then((doc) => {
        // console.log(doc);
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          setValues({ ...doc.data() });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          Notification({ message: "No profile found ", type: "danger" });
          navigateUser("/auth");
        }
        setLoading(false);
      });
    } else {
      console.log("No user found");
      Notification({ message: "No profile found ", type: "danger" });
      navigateUser("/auth");
      setLoading(false);
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
  };

  const uploadLogo = (e) => {
    let file = e.target.files[0];
    // console.log(file);s
    //ref(storage,'path to file',file,name)
    const storageRef = ref(storage, "user_Image/" + file.name);
    //uploadBytesResumable(storage-Ref,file)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadLoading(progress);
      },
      (error) => {
        Notification({ message: "something went wrong" });
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValues({
            ...values,

            userImage: downloadURL,
          });
          // setPP({ ...pp, userImage: downloadURL });
          Notification({ message: "file uploaded successfully" });
          setUploadLoading(0);
        });
      }
    );

    // upload file to firebase storage
    // get the url of the file
    // set the url to the logo value state
  };
  const makeEditable = async () => {
    if (disableField) {
      setDisableField(false);
    } else {
      setDisableField(true);
      //
      //call firebase function to update employer profile

      try {
        await setDoc(
          doc(db, "userInfo", uid),
          {
            ...values,
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
    }
  };

  const logout = () => {
    auth.signOut();
    navigateUser("/auth");
    localStorage.removeItem("user");
  };
  return (
    <>
      {user ? (
        <div
          sx={{
            color: state.shades.secondary,
            backgroundColor: state.shades.primary,
          }}
        >
          {loading ? (
            <div>
              <img
                style={{ width: "100%", height: "100vh" }}
                // src={loadinglogo}
                alt="loading"
              />
            </div>
          ) : (
            <form
              style={{
                color: state.shades.secondary,
                backgroundColor: state.shades.primary,
              }}
              onSubmit={(e) => submit(e)}
              className="profile-container"
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  // lg={12}
                >
                  <Grid
                    container
                    rowSpacing={3}
                    // border="1px solid red"
                    width="90%"
                    margin="auto"
                  >
                    <Grid item xs={12} md={12}>
                      <div className="upload-btn-container">
                        {uploadLoading > 0 && uploadLoading <= 100 ? (
                          <div>Loading {uploadLoading} %</div>
                        ) : (
                          <>
                            <input
                              accept="image/*"
                              style={{
                                display: "none",
                              }}
                              ref={inputRef}
                              type={"file"}
                              value={""}
                              onChange={(e) => uploadLogo(e)}
                            />
                            <Button
                              sx={{ display: disableField ? "none" : "block" }}
                              onClick={() => inputRef.current.click()}
                            >
                              Upoad Logo
                            </Button>
                            {/* {values.logo &&  ( */}
                            <div
                              className="logo-img"
                              style={{
                                border: "2px solid rgba(255, 255, 255)",
                                borderRadius: "100%",
                                backgroundImage: `url(${values.userImage})`,

                                // background-size: 120%;
                              }}
                            ></div>
                            {/* )} */}
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        // marginBottom="4px"

                        InputLabelProps={{
                          sx: {
                            color: state.shades.secondary,

                            // border: "1px solid red"
                          },
                        }}
                        inputProps={{
                          style: {
                            color: state.shades.secondary,
                            marginBottom: "1rem",

                            // marginBottom: "1rem",
                            borderStyle: "none",
                            border: "1px solid white",
                            width: "80%",
                            margin: "auto",
                          },
                        }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: state.shades.secondary,
                          },
                        }}
                        disabled={disableField}
                        size="small"
                        fullWidth
                        value={values.userName}
                        onChange={(e) =>
                          setValues({ ...values, userName: e.target.value })
                        }
                      />

                      <TextField
                        InputLabelProps={{
                          sx: {
                            color: state.shades.secondary,
                          },
                        }}
                        inputProps={{
                          style: {
                            color: state.shades.secondary,
                            border: "1px solid white",
                          },
                        }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: state.shades.secondary,
                          },
                        }}
                        disabled={disableField}
                        size="small"
                        fullWidth
                        value={values.userEmail}
                        onChange={(e) =>
                          setValues({ ...values, userEmail: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div
                        style={{
                          color: state.shades.secondary,
                          backgroundColor: state.shades.primary,
                        }}
                        className="btn-container"
                      >
                        <Button onClick={makeEditable}>
                          {" "}
                          {disableField ? "Edit" : "save"}
                        </Button>
                        <Button onClick={logout}>Logout</Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider />
              </Grid>
            </form>
          )}
        </div>
      ) : (
        navigateUser("/auth")
      )}
    </>
  );
}

export default Profile;
