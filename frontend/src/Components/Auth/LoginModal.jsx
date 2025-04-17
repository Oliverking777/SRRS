import React, { useState } from "react";
import "./Modal.css";
import { assets } from "../../assets/assets";

const LoginModal = ({ onClose, switchToSignup }) => {
  const [activeTab, setActiveTab] = useState("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Login form submitted:", formData);
    
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
          <h2>Welcome back</h2>
          <p>Enter your credentials to sign in to your account</p>
          
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
            
            <div className="form-row">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <span className="forgot-link">Forgot password?</span>
            </div>
            
            <button type="submit" className="submit-btn">Sign in</button>
          </form>
          
          <p className="redirect-text">
            Don't have an account? <span onClick={switchToSignup} className="redirect-link">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;