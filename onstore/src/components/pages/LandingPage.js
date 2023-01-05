import React from 'react'
// import Navigation from "../pages/landingpageSection/navigation/index"
import Footer from './landingpageSection/footer'
import Hero from './landingpageSection/hero'
import Products from './landingpageSection/Products'


function LandingPage() {
  return (
    <div>
        {/* <Navigation /> */}
        <Hero />
        <Footer />
        <Products />
    </div>
  )
}

export default LandingPage