import React from 'react'
// import Navigation from "../pages/landingpageSection/navigation/index"
import Footer from './landingpageSection/footer'
import Hero from './landingpageSection/hero'
import Products from './landingpageSection/Products'
import TestProduct from './landingpageSection/Testproduct/index'

function LandingPage() {
  return (
    <div>
         
        <Hero />
        <TestProduct />
        <Products />
        {/* <Footer /> */}
    </div>
  )
}

export default LandingPage