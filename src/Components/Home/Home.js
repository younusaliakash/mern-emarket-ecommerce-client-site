import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div>
      <div className="row">

      </div>
      <div className="row products">
        {products.length === 0 && (
          <div className="loading">
            {" "}
            <img
              src="https://epaper.timesgroup.com/TOI/TimesOfIndia/Images/Spinner.gif"
              alt=""
            />
          </div>
        )}
        {products?.map((product) => (
          <Products key={product._id} productInfo={product}></Products>
        ))}
      </div>
    </div>
  );
};

export default Home;
