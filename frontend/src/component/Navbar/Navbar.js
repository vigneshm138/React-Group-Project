import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Authuse } from "../UserAuth";
import logo from "./V-removebg-preview.png";

const Navbar = () => {
  const useau = Authuse();
  console.log(useau.userName);
  // console.log(useau.userName !== "admin");
  return (
    <div>
      <div className="head">
        <div className="logo">
          <img src={logo} />
        </div>
        <div>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/aboutus"}>About Us</NavLink>
          <NavLink to={"/services"}>Services</NavLink>
          <NavLink to={"/product"}>Products</NavLink>
        </div>
        <div>
          {!useau.userName ? (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/signup"}>Sign up</NavLink>
            </>
          ) : useau.userName === "admin" ? (
            <>
              {" "}
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/signup"}>Sign up</NavLink>
              <NavLink to={"/admin"}>Admin</NavLink>
              <NavLink to={"/profile"}>Profile</NavLink>
            </>
          ) : (
            <NavLink to={"/profile"}>Profile</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
