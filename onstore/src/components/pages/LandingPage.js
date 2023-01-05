import React from "react";
// import Navigation from "../pages/landingpageSection/navigation/index"
import Footer from "./landingpageSection/footer";
import Hero from "./landingpageSection/hero";
import Products from "./landingpageSection/Products";

function LandingPage() {
  return (
    <div>
      <Hero />

      <Products />
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;
