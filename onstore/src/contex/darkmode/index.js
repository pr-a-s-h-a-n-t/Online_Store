import React, { useReducer, createContext, useEffect } from "react";

export const DarkmodeContext = createContext();

const initialState = {
  mode: JSON.parse(localStorage.getItem("darkmode"))?.mode || "light",
  shades: JSON.parse(localStorage.getItem("darkmode"))?.shades || {
    primary: "#fff",
    secondary: "#000",
    tertiary: "#000",
  },
};

const reducer = (state = initialState, action) => {
  let newmode;
  switch (action.type) {
    case "MAKE_DARK":
      newmode = {
        mode: "dark",
        shades: {
          primary: "#27292B  ",
          secondary: "#ffff ",
          tertiary: "#fff",
          LandingPageNavbackground: "#404258",
          LandingPageNaviconButton: "#004242",
          candidateapplication: "#504A4B",
          candidateapplicationrowcard: "#4B0082",

          solutionCardBackground: "#004242",
        },
        // landingpage: {
        //   solutionCard: {
        //     color: "#fff",
        //     background: "black",
        //     boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
        //     hoverBackground:"orange",
        //   },
        //   cvUpload:{
        //     color: "#fff",
        //     background: "black",
        //   },
        //   FeatureJob:{
        //     color: "#fff",
        //     background: "black",
        //   },
        //   Footer:{
        //     color: "#fff",
        //     background: "black",
        //   },
        //   LandingPageNav:{
        //     color: "#fff",
        //     background: "black",
        //   },
        //   onPlatform:{
        //     color: "#fff",
        //     background: "black",
        //   },
        //   RighJobSection:{
        //     color: "#fff",
        //     background: "black",
        //   }
        // },
      };
      localStorage.setItem("darkmode", JSON.stringify(newmode));
      return newmode;

    case "MAKE_LIGHT":
      newmode = {
        mode: "light",
        shades: {
          background: "#ffff ",
          primary: "#ffff",
          secondary: "#000",
          tertiary: "#000",
          // new: "grey",
        },
      };
      localStorage.setItem("darkmode", JSON.stringify(newmode));
      return newmode;

    default:
      return state;
  }
};

export const DarkmodeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state, "change in darkmode");
  }, [state]);
  return (
    <DarkmodeContext.Provider value={[state, dispatch]}>
      {children}
    </DarkmodeContext.Provider>
  );
};
