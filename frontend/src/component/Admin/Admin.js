import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";
import { NavLink, Outlet } from "react-router-dom";
// import UserTables from './UserTables'
import { Authuse } from "../UserAuth";
// import Adminverify from './Adminverify'

export default function Admin() {
  const useau = Authuse();
  const URLlink = useau.productsUrl

  const [name, setname] = useState();
  const [location, setlocation] = useState();
  const [price, setprice] = useState();
  const [type, settype] = useState();
  const [img, setimg] = useState();
  const [bhk, setBhk] = useState()
  const [sqf, setsqf] = useState()
  const [abouthouse, setabouthouse] = useState()
  const [addhouse, setaddhouse] = useState(true)
  const [veriify, setveriify] = useState(false)

  const handleSubmit = (e) => {
    useau.setsubmitRender(!useau.submitRender);
    console.log(useau.submitRender);
    e.preventDefault();
    console.log(name, location, type);
    axios
      .post("http://localhost:3009/houses/post", {
        proname: name,
        userID: useau.userId,
        location: location,
        price: price,
        img: img,
        type: type,
        bhk: bhk,
        sqft: sqf,
        aboutpro: abouthouse,
        Status: "pending",
        mode: "user",
      })
      .then((res) => {
        console.log(res.data);
        // setsend("details sended");
      });
  };

  const handleah = () => {
    setaddhouse(true)
    setveriify(false)
  }

  const handlu = () => {
    setaddhouse(false)
    setveriify(true)
  }
  return (
    <>

      <div className="admin">
        <div className="adminOption">
          <button onClick={handleah} style={addhouse ? { backgroundColor: "black", color: "white" } : {}}>add house</button>
          <button onClick={handlu} style={veriify ? { backgroundColor: "black", color: "white" } : {}}>user</button>
        </div>
        {addhouse && <div className="adminD">
          <h1>add house</h1>
          <div className="form-div">
            <form onSubmit={handleSubmit} className="form">
              <div>
                <label>Project Name:</label>
                <input
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  required
                ></input>
              </div>
              <div>
                <label>location:</label>
                <input
                  onChange={(e) => setlocation(e.target.value)}
                  required
                  value={location}
                ></input>
              </div>
              <div>
                <label>BHK:</label>
                <input
                  type="number"
                  onChange={(e) => setBhk(e.target.value)}
                  value={bhk}
                  required
                ></input>
              </div>
              <div>
                <label>SQF:</label>
                <input
                  type="number"
                  onChange={(e) => setsqf(e.target.value)}
                  value={sqf}
                  required
                ></input>
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  onChange={(e) => setprice(e.target.value)}
                  value={price}
                  required
                ></input>
              </div>
              <div>
                <label>ImageLink:</label>
                <input
                  type="text"
                  onChange={(e) => setimg(e.target.value)}
                  required
                  value={img}
                ></input>
              </div>
              <div>
                <label>Type:</label>
                <select
                  onChange={(e) => settype(e.target.value)}
                  required
                  value={type}
                >
                  <option value="">Select an option</option>
                  <option value="Rental house">Rental house</option>
                  <option value="Duplex house">Duplex house</option>
                  <option value="Villas house">Villas house</option>
                  <option value="Bunglaow house">Bunglaow house</option>
                  <option value="Farm house">Farm house</option>
                  <option value="Eco-Friendly house">Eco-Friendly house</option>
                </select>
              </div>
              <div className="houseArea">
                <label>About house:</label>
                <textarea onChange={(e) => setabouthouse(e.target.value)} value={abouthouse} required />
              </div>
              <div className="formBtn">
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
              </div>
            </form>
          </div>
        </div>}
        {veriify && <div className="data-output">
          <div style={{ display: "flex" }}>
            <NavLink to={"data"}>Primary data</NavLink>
            <NavLink to={"adminVerify"}>Waiting for Verify</NavLink>
          </div>
          <hr />
          <div>
            <Outlet />
          </div>
        </div>}
      </div>




      {/* <UserTables /> */}
    </>
  );
}
