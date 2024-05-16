import axios from "axios";
import React, { useEffect, useState } from "react";
import { Authuse } from "../UserAuth";
import "./Adminverify.css";

export default function Adminverify() {
  const [list, setlist] = useState([]);
  const [fliterlist, setfliterlist] = useState([]);
  const useauth = Authuse();
  const URLLink = useauth.productsUrl;
  useEffect(() => {
    axios.get("http://localhost:3009/houses/get").then((res) => setlist(res.data));
    // setfliterlist(list.filter((item)=>{item.mode==="user"}))
  }, [list]);

  const handleVerfiy = (id) => {

    axios
      .put("http://localhost:3009/houses/update/" + id, {

        status: "Verified",

      })
      .then((res) => console.log(res.data));
  };

  const handleReject = (id) => {
    console.log(id);
    axios
      .put("http://localhost:3009/houses/update/" + id, {

        status: "rejeted",

      })
      .then((res) => console.log(res.data));
  };

  return (
    <div className="adminVerifyBtn">
      <>
        <table>
          <thead>
            <td>Project name</td>
            <td>location</td>
            <td>BHK</td>
            <td>Img Link</td>
            <td>price</td>
            <td>SQF</td>
            <td>type</td>
            <td>about house</td>
            <td>action</td>
          </thead>
          <tbody>
            {list.map((e) => {
              return (
                <tr key={e.id}>
                  {/* <td key={e.id}>{e.id}</td> */}
                  <td>{e.proname}</td>
                  <td>{e.location}</td>
                  <td>{e.bhk}</td>
                  <td>
                    <img src={e.img}></img>
                  </td>
                  <td>{e.price}</td>
                  <td>{e.sqft}</td>
                  <td>{e.type}</td>
                  <td>{e.aboutpro}</td>
                  <td>
                    <button
                      disabled={e.checked}
                      onClick={() =>
                        handleVerfiy(
                          e._id,
                          e.name,
                          e.userID,
                          e.location,
                          e.type,
                          e.price,
                          e.img
                        )
                      }
                    >
                      verfiy
                    </button>
                    <button
                      disabled={e.checked}
                      onClick={() =>
                        handleReject(
                          e._id,
                          e.name,
                          e.userID,
                          e.location,
                          e.type,
                          e.price,
                          e.img
                        )
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </div>
  );
}
