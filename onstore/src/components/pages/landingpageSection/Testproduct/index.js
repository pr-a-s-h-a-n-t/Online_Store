import React, { useState } from "react";
import "./Product.css";
import Card from "./Card";

export default function Products(props) {
  const { setCartCount, cartCount } = props;

  const [products, setProducts] = useState([]);

  React.useEffect(function () {
    fetch(
      "https://acciojob-module-7-sept-2022-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
    )
      .then((res) => res.json())
      .then((data) => setProducts(Object.values(data)));
  }, []);

const [store, setStore] = useState([]);
// React.useEffect(() => {
//     mystore();
//   }, []);

//   const mystore = async () => {
//     const res = await fetch('https://fakestoreapi.com/products');
//     // const res = await fetch("https://api.escuelajs.co/api/v1/products ");

//     // https://api.escuelajs.co/api/v1/products

//     const jsondata = await res.json();
//     jsondata.forEach((object) => {
//       object.amount = 1;
//     });
//     setStore(jsondata);
//     setProducts(jsondata);
//   };

  console.log(products);



  return (
    <>
      <h3 className="products-heading">Top Selling Products</h3>
      <div className="products-container">
        {products.map((item, index) => (
          <Card
            key={index}
            item={item}
            //   setCartCount={setCartCount}
            //   cartCount = {cartCount}
          />
        ))}
      </div>
    </>
  );
}
