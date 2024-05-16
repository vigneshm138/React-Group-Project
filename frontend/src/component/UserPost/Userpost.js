import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Userpost.css";
import { Authuse } from "../UserAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";

export default function Userpost() {
  const [name, setname] = useState();
  const [location, setlocation] = useState();
  const [price, setprice] = useState();
  const [type, settype] = useState();
  const [img, setimg] = useState();
  const [send, setsend] = useState();
  const [userDetails, setuserDetails] = useState([]);
  const [userfil, setuserfil] = useState([]);
  const [render, setrender] = useState(true);
  const [showsh, setshowsh] = useState(true);
  const [showdb, setshowdb] = useState(false);
  const [bhk, setBhk] = useState();
  const [sqf, setsqf] = useState();
  const [abouthouse, setabouthouse] = useState();
  const [highlights, sethighlights] = useState([]);

  const useauth = Authuse();
  const navigate = useNavigate();
  console.log("user");
  useEffect(() => {
    axios
      .get("http://localhost:3009/houses/get")
      .then((res) => setuserDetails(res.data));
    console.log(userDetails);
    const filluser = userDetails.filter((item) => {
      return item.userID === useauth.userId;
    });
    setuserfil(filluser);
  }, [render]);

  const handleSubmit = (e) => {
    setrender(!render);
    setTimeout(() => {
      setsend(" ");
    }, 2000);
    e.preventDefault();
    console.log(name, location, type);
    axios
      .post("http://localhost:3009/houses/post", {
        proname: name,
        location: location,
        price: price,
        img: img,
        type: type,
        bhk: bhk,
        sqft: sqf,
        aboutpro: abouthouse,
        status: "pending",
        mode: "user",
        userid: useauth.userId,
        highlights:highlights
      })
      .then((res) => {
        console.log(res.data);
        setsend("details sended");
      });
    setname(" ");
    setlocation(" ");
    setprice(" ");
    settype(" ");
    setimg(" ");
    setBhk(" ")
    setsqf(" ")
    setabouthouse(" ")
    sethighlights(" ")
    // const filluser = userDetails.filter((item) => {
    //   return item.userid === useauth.userId;
    // });
    // console.log(filluser);
    // setuserfil(filluser);
    alert("Products Add Sucessfully")
  };

  const handelSale = () => {
    if (!useauth.userName) {
      alert("only access to login");
      navigate("/login");
    }
  };
  const handleShow = () => {
    console.log(userDetails);
    const filluser = userDetails.filter((item) => {
      return item.userid === useauth.userId;
    });
    setuserfil(filluser);
  };

  const handleSYH = () => {
    setshowsh(true);
    setshowdb(false);
  };

  const handleDB = () => {
    setshowsh(false);
    setshowdb(true);
  };
  return (
    <div className="userpost">
      {useauth.userName ? (
        <div>
          <button
            className="userpostBtn"
            onClick={handleSYH}
            style={showsh ? { backgroundColor: "black", color: "white" } : {}}
          >
            sale your houses
          </button>
          <button
            className="userpostBtn"
            onClick={handleDB}
            style={showdb ? { backgroundColor: "black", color: "white" } : {}}
          >
            Dashboard
          </button>

          {showsh && (
            <div className="userpostform">
              <h1>add your house</h1>
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
                    placeholder="for exmple 1.5L"
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
                    <option value="Eco-Friendly house">
                      Eco-Friendly house
                    </option>
                  </select>
                </div>
                <div className="houseArea">
                  <label>About house:</label>
                  <textarea
                    onChange={(e) => setabouthouse(e.target.value)}
                    value={abouthouse}
                    required
                  />
                </div>
                <div className="houseArea">
                  <label>house highlights:</label>
                  <textarea
                    onChange={(e) => sethighlights(e.target.value.split(','))}
                    value={highlights}
                    required
                  />
                </div>
                <div className="formBtn">
                  <button type="submit">Submit</button>
                  <button type="reset">Reset</button>
                </div>
              </form>
            </div>
          )}

          {showdb && (
            <div style={{ marginTop: "10px" }} className="userposttable">
              <div>
                <button onClick={handleShow} className="refresh">
                  <FiRefreshCw />
                </button>
              </div>
              <table>
                <thead>
                  <td>name</td>
                  <td>location</td>
                  <td>price</td>
                  <td>image</td>
                  <td>type</td>
                  <td>status</td>
                </thead>
                <tbody>
                  {userfil.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.proname}</td>
                        <td>{item.location}</td>
                        <td>{item.price}</td>
                        <td>
                          <img src={item.img} />
                        </td>
                        <td>{item.type}</td>
                        <td>
                          <p
                            style={
                              item.status === "pending"
                                ? { backgroundColor: "red", color: "white" ,width:"fit-content",padding:"5px 10px",borderRadius:"5px"}
                                : {  backgroundColor: "greenyellow", color: "white" ,width:"fit-content",padding:"5px 10px",borderRadius:"5px"}
                            }
                          >
                            {item.status}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="userEntry">
          <button onClick={handelSale} className="saleButn">
            sale your house
          </button>
        </div>
      )}
    </div>
  );
}
