import React, { useEffect, useState } from "react";
import "./UserTable.css";
import axios from "axios";
import { Authuse } from "../UserAuth";

const UserTables = () => {
  // Products details json ----- userhhouse.json----http://localhost:2002/user
  const URLlink = "http://localhost:2002/user";

  const [show, setshow] = useState(false);
  const [name1, setname1] = useState();
  const [location1, setloaction1] = useState();
  const [type1, settype1] = useState();
  const [updateId, setupdateID] = useState();
  const [hdelete, sethdelete] = useState([]);
  const [img1, setimg1] = useState();
  const [price, setprice] = useState();
  const [bhk, setbhk] = useState();
  const [sqf, setsqf] = useState();
  const [details, setdetails] = useState([]);
  const [textarea, settextarea] = useState();



  const useAut = Authuse();

  useEffect(() => {
    axios.get("http://localhost:3009/houses/get").then((res) => setdetails(res.data));
  }, [hdelete, useAut.submitRender, show, details]);

  const handleDel = (i) => {
    axios
      .delete(`http://localhost:3009/houses/delete/${i}`)
      .then((res) => sethdelete(res.data));
  };
  const handleUpdate = (i) => {
    const up = details.find((x) => x._id === i);
    setname1(up.proname);
    setloaction1(up.location);
    setbhk(up.bhk)
    setsqf(up.sqft)
    setprice(up.price);
    settype1(up.type);
    setimg1(up.img);
    setupdateID(up._id);
    settextarea(up.aboutpro)
    setshow(true);
    console.log(updateId);
  };

  const handleSubmitUpdate = (e) => {
    setshow(false);
    e.preventDefault();
    axios
      .put("http://localhost:3009/houses/update/"+updateId, {
        proname: name1,
        location: location1,
        price: price,
        img: img1,
        type: type1,
        bhk: bhk,
        sqft: sqf,
        aboutpro: textarea,
      })
      .then((re) => console.log(re))
      .then((er) => console.log(er));
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Project name</td>
            <td>location</td>
            <td>BHK</td>
            <td>Img Link</td>
            <td>price</td>
            <td>SQF</td>
            <td>type</td>
            <td>about house</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {details.map((x, i) => {
            return (
              <tr key={i}>
                <td>{x.proname}</td>
                <td>{x.location}</td>
                <td>{x.bhk}</td>
                <td
                  style={{
                    maxWidth: "400px",
                    overflow: "auto",
                  }}
                >
                  {x.img}
                </td>
                <td>{x.price}</td>
                <td>{x.sqft}</td>
                <td>{x.type}</td>
                <td>{x.aboutpro}</td>
                <td>
                  <button className="updatede" onClick={() => handleDel(x._id)}>del</button>
                  <button className="updatede" onClick={() => handleUpdate(x._id)}>update</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {show && (
        <div className="mainUpdate">
          <div className="update">
            <h4>Update </h4>
            <form onSubmit={handleSubmitUpdate}>
              <div>
                <label>Project Name:</label>
                <input
                  onChange={(e) => setname1(e.target.value)}
                  value={name1}
                  required
                ></input>
              </div>
              <div>
                <label>location:</label>
                <input
                  onChange={(e) => setloaction1(e.target.value)}
                  required
                  value={location1}
                ></input>
              </div>
              <div>
                <label>BHK:</label>
                <input
                  type="number"
                  onChange={(e) => setbhk(e.target.value)}
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
                  onChange={(e) => setimg1(e.target.value)}
                  required
                  value={img1}
                ></input>
              </div>
              <div>
                <label>Type:</label>
                <select
                  onChange={(e) => settype1(e.target.value)}
                  required
                  value={type1}
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
                  onChange={(e) => settextarea(e.target.value)}
                  value={textarea}
                  required
                />
              </div>
              <div>
                <button type="submit">submit</button>
                <button type="button" onClick={() => setshow(false)}>
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTables;
