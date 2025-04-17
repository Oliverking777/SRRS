import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="header">
      <div className="componets">
        <div className="header_titles">
          <img src={assets.heart_rate} alt="" />
          <p>Sickness Recording & Reporting System</p>
        </div>
        <div className="des">
          <span>
            A comprehensive platform for recording, tracking, and analyzing
            sickness data across different regions.
          </span>
        </div>
        <div className="headerbuttons">
          <div className="get_started">
            <span>
              Get Started 
            </span>
            <img src={assets.arrow_right} alt="" />
          </div>
          <div className="sign">
            <span>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
