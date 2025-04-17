import React from "react";
import "./Nav_bar.css";
import { assets } from "../../assets/assets";

const Nav_bar = () => {
  const handleclick=()=>{
    window.location.href="/"
  }
  return (
    <div className="nav_bar">
      <div className="left" onClick={handleclick}>
        <img src={assets.heart_rate} alt="" />
        <span>SRRS</span>
      </div>
      <div className="middle"></div>
      <div className="right">
        <span id="login">Login</span>
        <p id="signup">Sign Up</p>
      </div>
    </div>
  );
};

export default Nav_bar;
