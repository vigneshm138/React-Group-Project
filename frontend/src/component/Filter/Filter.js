
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import './fliter.css'
export default function Filter() {
    const [type, settype] = useState();
    const [priceabove, setpriceabove] = useState();
    const [pricebelow, setpricebelow] = useState();
    const [list, setlist] = useState([]);
    const [filterlist, setfliterlist] = useState([]);
    const [bhk, setbhk] = useState();
    const [location, setlocation] = useState();
    const [showprice, setshowprice] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3009/houses/get").then((res) => setlist(res.data));
    }, []);
    console.log(list);
    const handlesubmit = () => {
        console.log(list);
        
        if (type && (priceabove || pricebelow) && bhk && location) {
            setfliterlist(
                list.filter(
                    (item) =>
                        item.type == type &&
                        (item.price >= priceabove || item.price <= pricebelow) && item.bhk == bhk && item.location == location && item.status=='Verified'))
            console.log(filterlist)
        } else if (type) {
            setfliterlist(list.filter((item1) => item1.type == type && item1.status=='Verified'))
            console.log(filterlist)
        } else if (bhk) {
            setfliterlist(list.filter((item2) => item2.bhk == bhk && item2.status=='Verified'))
            console.log(filterlist)
        } else if (location) {
            setfliterlist(list.filter((item3) => item3.location == location && item3.status=='Verified'))
            console.log(filterlist)
        } else if (priceabove) {
            setfliterlist(list.filter((item3) => item3.price >= priceabove && item3.status=='Verified'))
            console.log(filterlist)
        } else if (pricebelow) {
            setfliterlist(list.filter((item3) => item3.price <= pricebelow && item3.status=='Verified'))
            console.log(filterlist)
        }
    }

    return (
        <div>
            <div className="fliter-field">
                <select onChange={(e) => settype(e.target.value)} className="select">
                    <option value="">Select an propertie type</option>
                    <option value="Rental house">Rental house</option>
                    <option value="Duplex house">Duplex house</option>
                    <option value="Villas house">Villas house</option>
                    <option value="Bunglaow house">Bunglaow house</option>
                    <option value="Farm house">Farm house</option>
                    <option value="Eco-Friendly house">Eco-Friendly house</option>
                </select>
                <br></br>
                <button onClick={() => setshowprice(!showprice)} className="btn-price">Price</button>
                {showprice &&
                    <div className="price-dropdown">

                        <select className="price-select" onChange={(e) => setpriceabove(e.target.value)}>
                            <option value={" "}>From</option>
                            <option value={100000}>1 lacks</option>
                            <option value={500000}>5 lacks</option>
                            <option value={1000000}>10  lacks</option>
                            <option value={1500000}>15  lacks</option>
                            <option value={2000000}>20  lacks</option>
                            <option value={2500000}>25  lacks</option>
                        </select>



                        <select className="price-select">
                            <option value={" "} onChange={(e) => setpricebelow(e.target.value)}>To</option>
                            <option value={500000}>5 lacks</option>
                            <option value={1000000}>10 lacks</option>
                            <option value={20000000}>20 lacks</option>
                            <option value={3000000}>30 lacks</option>
                            <option value={4000000}>40 lacks</option>
                            <option value={5000000}>50 lacks</option>
                        </select>

                    </div>}


                <input type="text" onChange={(e) => setlocation(e.target.value)} placeholder="Location" className="select"></input>

                <select onChange={(e) => setbhk(e.target.value)} className="select">
                    <option value={" "}>Select an BHK</option>
                    <option value={"1"} >1 BHK</option>
                    <option value={"2"}>2 BHK</option>
                    <option value={"3"}>3 BHK</option>
                </select>
                <button onClick={handlesubmit} className="btn-search">search</button>
            </div>

            <div className="parent-search">
                {filterlist.map((map) => {
                    console.log(map);
                    return (
                        <div className="result-search">
                            <img src={map.img} className="result-img"></img>
                            <p className="result-text"> product name :{map.proname}</p>
                            <p className="result-text"> product type:{map.type}</p>
                            <p className="result-text">product price:{map.price}</p>
                            <p className="result-text">product location:{map.location}</p>
                            <p className="result-text"> square feet:{map.sqft}</p>
                            <p className="result-text"> BHK:{map.bhk}</p>
                            <button className="contact-btn">Contact</button>
                        </div>

                    );
                })}
            </div>
        </div>
    );
}