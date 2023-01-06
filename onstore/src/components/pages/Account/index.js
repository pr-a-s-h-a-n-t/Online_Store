import { Notification } from "../../../utils/Notifications";

import { Label } from "@mui/icons-material";
import { Button, Divider, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth, storage } from "../../../firebaseConfig/index";

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

 

function EmployerProfile() {
  const [state, dispatch] = React.useContext(DarkmodeContext );

  const navigateEmployer = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const uid = user.uid;
  const [uploadLoading, setUploadLoading] = useState(0);
  let inputRef = React.createRef();
  const [disableField, setDisableField] = useState(true);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    //should be fetched from firestore if the user has already created a profile
    companyName: "",
    companyWebsites: "",
    companyEmail: "",
    companyPhone: "",
    industryType: "",
    noOfEmployees: "",

    companyLocation: "",
    companyTagline: "",
    companyDescription: "",
    logo: "",
  });

  useEffect(() => {
    //fetch data from firestore
    //if data exists then set the values
    setLoading(true);
    let user = JSON.parse(localStorage.getItem("user"));
    let uid = user.uid;
    let docRef = doc(db, "userInfo", uid);
    getDoc(docRef).then((doc) => {
      // console.log(doc);
      if (doc.exists()) {
        // console.log("Document data:", doc.data());
        setValues({ ...doc.data() });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        Notification({ message: "No profile found", type: "danger" });
      }
      setLoading(false);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    // console.log(values);s

    //call firebase function to create employer profile
    //store in firestore collection (userInfo)
    //create a doc with docId = uid

    // setDoc(docInfo,data)
    //docInfo= doc(database,collection name, docId)
    // try {
    //   await setDoc(doc(db, "userInfo", uid), {
    //     ...values,
    //     type: "employer",
    //   });
    //   Notification({ message: "profile created successfully" });
    //   navigateEmployer("/employer/profile");
    // } catch (err) {
    //   console.log(err);
    //   Notification({ message: "something went wrong" });
    // }
  };

  const uploadLogo = (e) => {
    let file = e.target.files[0];
    // console.log(file);s
    //ref(storage,'path to file',file,name)
    const storageRef = ref(storage, "company-logo/" + file.name);
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
            logo: downloadURL,
          });
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
    dispatch({ type: "LOGOUT" });
    navigateEmployer("/employer/auth");
  };
  return (
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
          className="onboarding-container"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
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
                        {values.logo && (
                          <div
                            className="logo-img"
                            style={{
                              backgroundImage: `url(${values.logo})`,

                              // background-size: 120%;
                            }}
                          ></div>
                        )}
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    InputLabelProps={{
                      sx: {
                        color: state.shades.secondary,
                      },
                    }}
                    inputProps={{
                      style: {
                        color: state.shades.secondary,
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: state.shades.secondary,
                      },
                    }}
                    disabled={disableField}
                    required
                    size="small"
                    fullWidth
                    value={values.companyName}
                    onChange={(e) =>
                      setValues({ ...values, companyName: e.target.value })
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
                    value={values.companyTagline}
                    onChange={(e) =>
                      setValues({ ...values, companyTagline: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={2}>
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
            <Grid item xs={12} sm={6}>
              <label className="field-label">Company Email</label>
              <TextField
                InputLabelProps={{
                  sx: {
                    color: state.shades.secondary,
                  },
                }}
                inputProps={{
                  style: {
                    color: state.shades.secondary,
                  },
                }}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: state.shades.secondary,
                  },
                }}
                disabled={true}
                size="small"
                type="email"
                required
                fullWidth
                value={values.companyEmail}
                onChange={(e) =>
                  setValues({ ...values, companyEmail: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="field-label">Company Phone</label>
              <TextField
                InputLabelProps={{
                  sx: {
                    color: state.shades.secondary,
                  },
                }}
                inputProps={{
                  style: {
                    color: state.shades.secondary,
                  },
                }}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: state.shades.secondary,
                  },
                }}
                disabled={disableField}
                size="small"
                required
                fullWidth
                value={values.companyPhone}
                onChange={(e) =>
                  setValues({ ...values, companyPhone: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label className="field-label">Company Website</label>
              <TextField
                InputLabelProps={{
                  sx: {
                    color: state.shades.secondary,
                  },
                }}
                inputProps={{
                  style: {
                    color: state.shades.secondary,
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
                value={values.companyWebsites}
                onChange={(e) =>
                  setValues({ ...values, companyWebsites: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label className="field-label">Company Location</label>
              <TextField
                InputLabelProps={{
                  sx: {
                    color: state.shades.secondary,
                  },
                }}
                inputProps={{
                  style: {
                    color: state.shades.secondary,
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
                value={values.companyLocation}
                onChange={(e) =>
                  setValues({ ...values, companyLocation: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label className="field-label">Industry Type</label>
              <TextField
                InputLabelProps={{
                  sx: {
                    color: state.shades.secondary,
                  },
                }}
                inputProps={{
                  style: {
                    color: state.shades.secondary,
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
                value={values.industryType}
                onChange={(e) =>
                  setValues({ ...values, industryType: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label className="field-label">No. of employees</label>
              <TextField
                InputLabelProps={{
                  sx: {
                    color: state.shades.secondary,
                  },
                }}
                inputProps={{
                  style: {
                    color: state.shades.secondary,
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
                value={values.noOfEmployees}
                onChange={(e) =>
                  setValues({ ...values, noOfEmployees: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <label className="field-label">Company description</label>
              <TextField
                InputLabelProps={{
                  sx: {
                    color: state.shades.secondary,
                  },
                }}
                inputProps={{
                  style: {
                    color: state.shades.secondary,
                  },
                }}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: state.shades.secondary,
                  },
                }}
                disabled={disableField}
                multiline
                minRows={5}
                fullWidth
                value={values.companyDescription}
                onChange={(e) =>
                  setValues({ ...values, companyDescription: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}

export default EmployerProfile;
