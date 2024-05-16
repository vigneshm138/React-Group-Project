import React, { useState } from "react";
import "./Products.css";
import { Authuse } from "../UserAuth";
import { useNavigate } from "react-router-dom";

const Products = ({ productList }) => {
  const useau = Authuse();
  const navigate = useNavigate();
  const [btn, setbtn] = useState({});

  const handlepro = () => {
    if (useau.userName) {
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="products-container">
      {productList.length ? (
        productList.map((product, i) => {
          return (
            <div className="products-box" key={i}>
              <div>
                <div className="product-img">
                  <img src={product.img} alt="" />
                </div>
              </div>
              <div>
                <div className="products-details">
                  <p>
                    <span>Type :</span>
                    {product.type}
                  </p>
                  <p>
                    <span>Location :</span>
                    {product.location}
                  </p>
                  <p>
                    <span>Price :</span>
                    {product.price}
                  </p>
                </div>
                <div className="products-contact">
                  <button onClick={handlepro}>I'M Interest</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="notproducts">currently not available</h1>
      )}
    </div>
  );
};

export default Products;
