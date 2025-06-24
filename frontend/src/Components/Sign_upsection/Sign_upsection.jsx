import React from "react";
import "./Sign_upsection.css";
import { assets } from "../../assets/assets";

const Sign_upsection = () => {
  return (
    <div
      className="signipsec"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Decorative SVG background */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "120px",
          zIndex: 0,
          pointerEvents: "none",
        }}
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0,80 C480,160 960,0 1440,80 L1440,0 L0,0 Z" fill="#e9eefd" />
      </svg>
      <div className="sign_head" style={{ position: "relative", zIndex: 1 }}>
        <h1>Built for Everyone</h1>
        <p>
          Our platform serves different user types with tailored functionality.
        </p>
      </div>
      <div className="sections" style={{ position: "relative", zIndex: 1 }}>
        <div className="user_sect">
          <div className="user_head">
            <h1>Regular Users</h1>
            <p>
              For individuals who want to report illnesses and track health
              patterns
            </p>
          </div>
          <div className="user_body">
            <img src={assets.tick} alt="" />
            <p>Submit personal sickness reports with detailed symptoms</p>
          </div>
          <div className="user_body">
            <img src={assets.tick} alt="" />
            <p>View your reporting history and track personal health trends</p>
          </div>
          <div className="user_body">
            <img src={assets.tick} alt="" />
            <p>Receive alerts about health issues in your region</p>
          </div>
          <button className="start">Register as User</button>
        </div>
        <div className="admin_sect">
          <div className="user_head">
            <h1>Administrators</h1>
            <p>For health performance and researchers managing the system</p>
          </div>
          <div className="user_body">
            <img src={assets.tickred} alt="" />
            <p>Access comprehensive data analytics and reporting tools</p>
          </div>
          <div className="user_body">
            <img src={assets.tickred} alt="" />
            <p>Manage users, verify reports and send notifications</p>
          </div>
          <div className="user_body">
            <img src={assets.tickred} alt="" />
            <p>Configure system settings and customize the platform</p>
          </div>
          <button className="start">Register as Admin</button>
        </div>
      </div>
      {/* Decorative SVG wave at the bottom */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "80px",
          zIndex: 0,
          pointerEvents: "none",
        }}
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,40 C480,120 960,0 1440,40 L1440,80 L0,80 Z"
          fill="#fafbfe"
        />
      </svg>
    </div>
  );
};

export default Sign_upsection;
