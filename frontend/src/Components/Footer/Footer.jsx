import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="left_footer">
        <img src={assets.heart_rate} alt="SRRS Logo" />
        <p>
          {" "}
          © 2025 SRRS. All rights reserved&nbsp;
          <span style={{ color: "#4169e1", fontWeight: 600 }}>davidmbah</span>.
        </p>
      </div>
      <div className="right_footer">
        <a href="#" className="pr" aria-label="Privacy Policy">
          Privacy Policy
        </a>
        <a href="#" className="term" aria-label="Terms of Service">
          Terms of Service
        </a>
        <a href="#" className="contact" aria-label="Contact">
          Contact
        </a>
      </div>
    </div>
  );
};

export default Footer;
