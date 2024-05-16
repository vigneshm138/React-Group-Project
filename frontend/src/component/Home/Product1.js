
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./Home1.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Authuse } from "../UserAuth";

const Products = () => {
    const houseURL = Authuse()

    const [homeLists, setHomeLists] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3009/houses/get")
            .then((res) => setHomeLists(res.data.filter(item=>item.status==="Verified")))
            .catch((err) => console.log(err));
    }, []);

    return (
       <div>
        {homeLists.length? <div className="box">
            {homeLists.map((item, i) => {
                return (
                    <NavLink to={`${item._id}`} >
                        <div className="product-box" key={i}>
                            <div className="product-img">
                                <img src={item.img} />
                            </div>
                            <div className="product-details">
                                <h2>
                                    <span>
                                        <assets.FaIndianRupeeSign />
                                    </span>
                                    {item.price}
                                </h2>
                                <p className="pd-fp">
                                    {item.bhk} {item.type}
                                    <span> for sale in {item.location} </span>
                                </p>
                                <div className="proName-boxs">
                                    <div className="proName-box">
                                        <div className="proName-img">
                                            <span>
                                                <assets.PiBuildingsFill />
                                            </span>
                                        </div>
                                        <div className="proName-name">
                                            <p>project name</p>
                                            <p>{item.proname}</p>
                                        </div>
                                    </div>
                                    <div className="proName-box">
                                        <div className="proName-img">
                                            <span>
                                                <assets.PiHouseFill />
                                            </span>
                                        </div>
                                        <div className="proName-name">
                                            <p>buildup area</p>
                                            <p>{item.sqft}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="proHighli">
                                    <h3>Property highlights</h3>
                                    
                                        <ul>
                                        {item.highlights.map((item)=>{
                                            return(
                                                <li><assets.TiTickOutline className="tickIcon"/>{item}</li>
                                            )
                                        })}
                                      </ul> 
                                    
                                </div>
                                <div className="aboutProduct">
                                    {item.aboutpro.length < 60 ? (
                                        <p>{item.aboutpro}</p>
                                    ) : (
                                        <p>{item.aboutpro.slice(0, 43) + "..."}</p>
                                    )}
                                </div>
                                <div className="contact-owner">
                                    <button>contact owner</button>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                );
            })}
        </div>:<h1 className="noLength">add you houses using <NavLink to={"/services"}>services</NavLink> or contact admin</h1>}
       </div>
    );
};

export default Products;
