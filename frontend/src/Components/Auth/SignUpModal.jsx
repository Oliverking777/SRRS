import React, { useState } from "react";
import "./Modal.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const SignUpModal = ({ onClose, switchToLogin }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretKey: "",
    agreeToTerms: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    console.log("Signup form submitted:", formData);
    
    if (activeTab === "user") {
      onClose();
      navigate("/userdashboard", { replace: true });
    } else {
      console.log("Admin signup - different flow");
      // Handle admin route
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="auth-container">
          <div className="auth-logo">
            <img src={assets.heart_rate} alt="SRRS Logo" />
            <h1>SRRS</h1>
          </div>
          <h2>Create an account</h2>
          <p>Enter your details to create your account</p>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === "user" ? "active" : ""}`}
              onClick={() => setActiveTab("user")}
            >
              User
            </button>
            <button 
              className={`tab ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            {activeTab === "admin" && (
              <div className="form-group">
                <label htmlFor="secretKey">Secret Key</label>
                <input
                  type="password"
                  id="secretKey"
                  name="secretKey"
                  placeholder="Enter admin secret key"
                  value={formData.secretKey}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <div className="checkbox-group terms">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeToTerms">
                I agree to the <span className="terms-link">terms and conditions</span>
              </label>
            </div>
            
            {activeTab === "user" ? (
              <button type="submit" className="submit-btn">Create account</button>
            ) : (
              <button type="submit" className="submit-btn">Create admin account</button>
            )}
          </form>
          
          <p className="redirect-text">
            Already have an account? <span onClick={switchToLogin} className="redirect-link">Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;