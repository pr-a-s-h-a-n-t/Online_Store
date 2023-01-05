import React from "react";
import LandingPage from "../components/pages/LandingPage";
import HocNavigation from "../Hoc/HocNavigation";
// import Navigation from "../components/pages/landingpageSection/navigation/index"
import CartPage from "../components/pages/productscart";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AboutPage from "../components/pages/aboutpage";
import Account from "../components/pages/Account";
import Profile from "../components/pages/Account";
import UserAuth from "../components/pages/authPage/index";



function Navs() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HocNavigation />} />
          <Route
            // path="/landingpage"
            index
            element={
              <HocNavigation>
                <LandingPage />
              </HocNavigation>
            }
          />
           <Route
            path="/auth"
            // index
            element={
              <HocNavigation>
                <UserAuth />
              </HocNavigation>
            } />
          {/* <Route path="/" element={<LandingPage />} /> */}
          {/* <HocNavigation /> */}
          {/* <LandingPage /> */}
          <Route
            Route
            path="/cart"
            element={
              <HocNavigation>
                <CartPage />
              </HocNavigation>
            }
          />
          <Route
            path="/about"
            element={
              <HocNavigation>
                <AboutPage />
              </HocNavigation>
            }
          />
          <Route
            path="/profile"
            element={
              <HocNavigation>
                <Profile />
              </HocNavigation>
            }
          />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/aboutPage" element={<AboutPage />} />
          

          {/* <CartPage /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default Navs;
