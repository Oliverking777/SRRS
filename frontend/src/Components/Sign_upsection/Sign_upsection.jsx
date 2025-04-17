import React from "react";
import "./Sign_upsection.css";
import { assets } from "../../assets/assets";

const Sign_upsection = () => {
  return (
    <div className="signipsec">
      <div className="sign_head">
        <h1>Built for Everyone</h1>
        <p>
          Our platform serves different user types with tailored functionality.
        </p>
      </div>
      <div className="sections">
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
            <p>
              For health performance and researchers managing the system
            </p>
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
    </div>
  );
};

export default Sign_upsection;
