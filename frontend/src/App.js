import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
// import Home from "./component/Home";
import Login from "./component/Login & SignUp/Login";
import SignUp from "./component/Login & SignUp/SignUp";
import { Authuse } from "./component/UserAuth";
import Aboutus from "./component/About Us/About";
import Profile from "./component/Profile/Profile";
import Admin from "./component/Admin/Admin";
import UserTables from "./component/UserTable/UserTables";
import Services from "./component/Services/Services";
import Home1 from "./component/Home/Home1";
import Singleproducts from "./component/SingleProducts/SingleProducts";
import Adminverify from "./component/Admin Verify/Adminverify";
import Filter from "./component/Filter/Filter";



function App() {
  const user = Authuse()

  return (

    <div className="app">
      {/* <Navbar /> */}
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Home1 />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {user.userName === "admin" && <Route path="/admin" element={<Admin />}>
          <Route index element={<UserTables />}></Route>
          <Route path="data" element={<UserTables />}></Route>
          <Route path="adminVerify" element={<Adminverify />}></Route>
        </Route>}
        <Route path=":id" element={<Singleproducts />} />
        <Route path="/product" element={<Filter/>}></Route>

      </Routes>
    </div>

  );
}

export default App;