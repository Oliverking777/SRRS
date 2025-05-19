// import React from "react";

// const Setting = () => {
//   return (
//     <div className="settings-page">
//       <div className="settings-header">
//         <h1>Settings</h1>
//         <p>Manage your account settings and preferences.</p>
//       </div>

//       {/* Notification Settings Section */}
//       <div className="settings-section">
//         <div className="section-header">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="section-icon"
//           >
//             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//             <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//           </svg>
//           <h2>Notification Settings</h2>
//         </div>
//         <p className="section-description">Configure how and when you receive notifications</p>

//         <div className="setting-item">
//           <div className="setting-info">
//             <h3>Email Notifications</h3>
//             <p>Receive notifications via email</p>
//           </div>
//           <div className="toggle-switch enabled"></div>
//         </div>

//         <div className="setting-item">
//           <div className="setting-info">
//             <h3>SMS Notifications</h3>
//             <p>Receive notifications via text message</p>
//           </div>
//           <div className="toggle-switch"></div>
//         </div>

//         <div className="section-subheader">
//           <h3>Notification Types</h3>
//           <p>Select which types of notifications you want to receive</p>
//         </div>

//         <div className="setting-item">
//           <div className="setting-info">
//             <h3>New Regional Reports</h3>
//             <p>When new sickness reports are submitted in your area</p>
//           </div>
//           <div className="toggle-switch enabled"></div>
//         </div>

//         <div className="setting-item">
//           <div className="setting-info">
//             <h3>Health Alerts</h3>
//             <p>Emergency health alerts and warnings in your region</p>
//           </div>
//           <div className="toggle-switch enabled"></div>
//         </div>

//         <div className="setting-item">
//           <div className="setting-info">
//             <h3>System Updates</h3>
//             <p>New features and improvements to the platform</p>
//           </div>
//           <div className="toggle-switch"></div>
//         </div>

//         <div className="button-container">
//           <button className="save-button">Save Notification Settings</button>
//         </div>
//       </div>

//       {/* Privacy & Data Settings Section */}
//       <div className="settings-section">
//         <div className="section-header">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="section-icon"
//           >
//             <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//             <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//           </svg>
//           <h2>Privacy & Data Settings</h2>
//         </div>
//         <p className="section-description">Manage how your information is used and shared</p>

//         <div className="setting-item">
//           <div className="setting-info">
//             <h3>Data Sharing</h3>
//             <p>Control how your sickness reports can be used for health research</p>
//           </div>
//           <div className="dropdown">
//             <select>
//               <option>Anonymized Data Only</option>
//               <option>No Data Sharing</option>
//               <option>Full Data Sharing</option>
//             </select>
//           </div>
//         </div>

//         <div className="setting-item">
//           <div className="setting-info">
//             <h3>Location Precision</h3>
//             <p>Select how precisely your location is recorded in reports</p>
//           </div>
//           <div className="dropdown">
//             <select>
//               <option>City Level</option>
//               <option>Region Level</option>
//               <option>Exact Location</option>
//             </select>
//           </div>
//         </div>

//         <div className="setting-item">
//           <div className="setting-info">
//             <h3>Profile Visibility</h3>
//             <p>Who can see your profile information</p>
//           </div>
//           <div className="dropdown">
//             <select>
//               <option>Registered Users Only</option>
//               <option>Public</option>
//               <option>Only Me</option>
//             </select>
//           </div>
//         </div>

//         <div className="button-container">
//           <button className="save-button">Save Privacy Settings</button>
//         </div>
//       </div>

//       {/* Security Settings Section */}
//       <div className="settings-section">
//         <div className="section-header">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="section-icon"
//           >
//             <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//             <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//           </svg>
//           <h2>Security Settings</h2>
//         </div>
//         <p className="section-description">Manage your account security and password</p>

//         <div className="password-form">
//           <div className="form-group">
//             <label>Current Password</label>
//             <input type="password" className="password-input" value="••••••••" readOnly />
//           </div>

//           <div className="form-group">
//             <label>New Password</label>
//             <input type="password" className="password-input" value="••••••••" readOnly />
//           </div>
//           <p className="password-requirement">At least 8 characters with a mix of letters, numbers, and symbols</p>

//           <div className="form-group">
//             <label>Confirm New Password</label>
//             <input type="password" className="password-input" value="••••••••" readOnly />
//           </div>

//           <div className="button-container right-aligned">
//             <button className="update-button">Update Password</button>
//           </div>
//         </div>
//       </div>

//       {/* Danger Zone Section */}
//       <div className="settings-section danger-zone">
//         <h2 className="danger-heading">Danger Zone</h2>
//         <p className="danger-description">Irreversible account actions</p>

//         <div className="danger-item">
//           <div className="setting-info">
//             <h3>Delete Account</h3>
//             <p>Permanently delete your account and all of your data. This action cannot be undone.</p>
//           </div>
//           <button className="delete-button">Delete Account</button>
//         </div>

//         <div className="danger-item">
//           <div className="setting-info">
//             <h3>Export Your Data</h3>
//             <p>Download a copy of all your personal data and reports</p>
//           </div>
//           <button className="export-button">Export Data</button>
//         </div>
//       </div>

//       <style jsx>{`
//         .settings-page {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//           width: 100%
//           margin: 0 auto;
//           padding: 20px;
//           color: #333;
//         }

//         .settings-header {
//           margin-bottom: 24px;
//           padding-left: 20px;
//         }

//         .settings-header h1 {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 8px;
//         }

//         .settings-header p {
//           color: #666;
//           font-size: 16px;
//         }

//         .settings-section {
//           background-color: #fff;
//           border-radius: 8px;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//           margin-bottom: 24px;
//           padding: 24px;
//         }

//         .section-header {
//           display: flex;
//           align-items: center;
//           margin-bottom: 8px;
//         }

//         .section-icon {
//           width: 22px;
//           height: 22px;
//           margin-right: 12px;
//           color: #555;
//         }

//         .section-header h2 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0;
//         }

//         .section-description {
//           color: #666;
//           margin-top: 0;
//           margin-bottom: 24px;
//           padding-left: 34px;
//         }

//         .section-subheader {
//           margin-top: 32px;
//           margin-bottom: 16px;
//         }

//         .section-subheader h3 {
//           font-size: 16px;
//           font-weight: 600;
//           margin-bottom: 8px;
//         }

//         .section-subheader p {
//           color: #666;
//           font-size: 14px;
//           margin: 0;
//         }

//         .setting-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 16px 0;
//           border-bottom: 1px solid #eee;
//         }

//         .setting-item:last-child {
//           border-bottom: none;
//         }

//         .setting-info {
//           flex: 1;
//         }

//         .setting-info h3 {
//           font-size: 14px;
//           font-weight: 600;
//           margin: 0 0 4px 0;
//         }

//         .setting-info p {
//           color: #666;
//           font-size: 13px;
//           margin: 0;
//         }

//         .toggle-switch {
//           width: 40px;
//           height: 20px;
//           background-color: #ddd;
//           border-radius: 20px;
//           position: relative;
//           cursor: pointer;
//         }

//         .toggle-switch.enabled {
//           background-color: #4169e1;
//         }

//         .toggle-switch:before {
//           content: "";
//           position: absolute;
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           background-color: white;
//           top: 2px;
//           left: 2px;
//           transition: transform 0.3s;
//         }

//         .toggle-switch.enabled:before {
//           transform: translateX(20px);
//         }

//         .dropdown select {
//           width: 240px;
//           padding: 8px 12px;
//           border-radius: 4px;
//           border: 1px solid #ddd;
//           background-color: #fff;
//           font-size: 14px;
//           color: #333;
//           appearance: none;
//           background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 12px center;
//           background-size: 16px;
//           padding-right: 36px;
//         }

//         .password-form {
//           padding-top: 8px;
//         }

//         .form-group {
//           margin-bottom: 16px;
//         }

//         .form-group label {
//           display: block;
//           font-size: 14px;
//           font-weight: 500;
//           margin-bottom: 8px;
//         }

//         .password-input {
//           width: 100%;
//           padding: 10px 12px;
//           border-radius: 4px;
//           border: 1px solid #ddd;
//           font-size: 14px;
//         }

//         .password-requirement {
//           font-size: 12px;
//           color: #666;
//           margin-top: -8px;
//           margin-bottom: 16px;
//         }

//         .button-container {
//           margin-top: 24px;
//         }

//         .button-container.right-aligned {
//           text-align: right;
//         }

//         .save-button, .update-button {
//           background-color: #4169e1;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           padding: 10px 20px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .save-button:hover, .update-button:hover {
//           background-color: #3555c8;
//         }

//         .danger-zone {
//           border: 1px solid #ff4d4f;
//           border-radius: 8px;
//         }

//         .danger-heading {
//           color: #ff4d4f;
//           font-size: 18px;
//           font-weight: 600;
//           margin-top: 0;
//           margin-bottom: 8px;
//         }

//         .danger-description {
//           color: #666;
//           margin-top: 0;
//           margin-bottom: 24px;
//         }

//         .danger-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 16px 0;
//           border-bottom: 1px solid #eee;
//         }

//         .danger-item:last-child {
//           border-bottom: none;
//         }

//         .delete-button {
//           background-color: #ff4d4f;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           padding: 8px 16px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .delete-button:hover {
//           background-color: #ff7875;
//         }

//         .export-button {
//           background-color: white;
//           color: #333;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           padding: 8px 16px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .export-button:hover {
//           background-color: #f5f5f5;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Setting;
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyeFea-GyKwhyK1LWtLNpoo84Aj0RZ4V0",
  authDomain: "record-9587f.firebaseapp.com",
  projectId: "record-9587f",
  storageBucket: "record-9587f.appspot.com",
  messagingSenderId: "1070266167737",
  appId: "1:1070266167737:web:a42c8162425794c818c668",
  measurementId: "G-TWG9P67NR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Setting = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [regionalReports, setRegionalReports] = useState(true);
  const [healthAlerts, setHealthAlerts] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);

  const handleSaveNotificationSettings = async () => {
    const settingsData = {
      emailNotifications,
      smsNotifications,
      regionalReports,
      healthAlerts,
      systemUpdates,
      timestamp: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "notificationSettings", "user123"), settingsData);
      alert("Notification settings saved to Firebase!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    }
  };

  return (
    <div className="settings-page p-6 max-w-2xl mx-auto">
      <div className="settings-header mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your notification preferences below.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="accent-blue-600"
            />
            <span>Email Notifications</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="accent-blue-600"
            />
            <span>SMS Notifications</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={regionalReports}
              onChange={(e) => setRegionalReports(e.target.checked)}
              className="accent-blue-600"
            />
            <span>Regional Reports</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={healthAlerts}
              onChange={(e) => setHealthAlerts(e.target.checked)}
              className="accent-blue-600"
            />
            <span>Health Alerts</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={systemUpdates}
              onChange={(e) => setSystemUpdates(e.target.checked)}
              className="accent-blue-600"
            />
            <span>System Updates</span>
          </label>
        </div>

        <button
          onClick={handleSaveNotificationSettings}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default Setting;
