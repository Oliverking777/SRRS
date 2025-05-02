import React from "react";
import "./Adminboard.css";
import Admindash from "./admincomponent/Admindash";
import Adminusers from "./admincomponent/Adminusers";
import Adminreport from "./admincomponent/Adminreport";
import Adminsetting from "./admincomponent/Adminsetting";
import Geo_distri from "./admincomponent/Geo_distri";

import { useState } from "react";
import { Link } from "react-router-dom";

const Adminboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Handle navigation click
  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h2>SRRS</h2>
          <div className="sidezo">
            <span>Admin</span>
          </div>
        </div>

        <div className="navigation">
          <h3>Administration</h3>
          <ul>
            <li
              className={activeSection === "dashboard" ? "active" : ""}
              onClick={() => handleNavClick("dashboard")}
            >
              <span className="nav-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </span>
              Dashboard
            </li>
            <li
              className={activeSection === "Users" ? "active" : ""}
              onClick={() => handleNavClick("Users")}
            >
              <span className="nav-icon">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </span>
              Users
            </li>
            <li
              className={activeSection === "Reports" ? "active" : ""}
              onClick={() => handleNavClick("Reports")}
            >
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="2"
                    width="16"
                    height="20"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                  <path
                    d="M8 7H16"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M8 11H16"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M8 15H12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              Reports
            </li>
            <li
              className={activeSection === "settings" ? "active" : ""}
              onClick={() => handleNavClick("settings")}
            >
              <span className="nav-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              Settings
            </li>
            <li
              className={activeSection === "Geo" ? "active" : ""}
              onClick={() => handleNavClick("Geo")}
            >
              <span className="nav-icon">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </span>
              Geographical Distribution
            </li>
          </ul>
        </div>

        <div className="logout">
          <Link to="/">
            <button>Log Out</button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          <div className="tabs">
            <div className="tab-item active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </div>
          </div>

          <div className="profile-section">
            <div className="notification-bell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notification-badge">3</span>
            </div>
            <div className="profile-avatar"></div>
          </div>
        </div>

        {/* Render different content based on activeSection */}
        {activeSection === "dashboard" && <Admindash />}
        {activeSection === "Users" && <Adminusers />}
        {activeSection === "Reports" && <Adminreport />}
        {activeSection === "settings" && <Adminsetting />}
        {activeSection === "Geo" && <Geo_distri />}
      </div>
    </div>
  );
};

export default Adminboard;
