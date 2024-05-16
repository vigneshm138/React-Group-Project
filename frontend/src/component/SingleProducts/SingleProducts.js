import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProducts.css";
import { assets } from "../../assets/assets";
import { Authuse } from "../UserAuth";

const Singleproducts = () => {
  const url = Authuse();
  const id = useParams();
  const [housess, sethousess] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3009/houses/get")
      .then((res) => sethousess(res.data.filter((x) => x._id === id.id)));
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      {housess.map((item, i) => {
        return (
          <div className="SingleProuduct" key={i}>
            <div className="SingleProuduct-Img">
              <img src={item.img} />
            </div>
            <div className="SingleProuduct-Content">
              <h1>
                {item.proname} <span>-Project name</span>
              </h1>
              <h2>
                <assets.FaIndianRupeeSign className="rupeesIcon" />
                {item.price}
              </h2>
              <h2>
                {item.bhk} {item.type}
                <span> for sale in {item.location} </span>
              </h2>
              <div className="singleproduct-highlight">
                <h3>property highlights</h3>
                {/* <div> */}
                <ul>
                  {item.highlights.map((item) => {
                    return (
                      <li>
                        <assets.TiTickOutline className="tickicon" />
                        {item}
                      </li>
                    );
                  })}
                </ul>
                {/* </div> */}
              </div>
              <div className="singleproduct-about">
                <h3>property details</h3>
                <p>{item.aboutpro}</p>
              </div>
              <button>contact owner</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Singleproducts;
