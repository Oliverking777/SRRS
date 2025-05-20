import React, { useState } from "react";
import "./Modal.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  signInWithGoogle,
} from "../../../backend copy/services/authService";

const LoginModal = ({ onClose, switchToSignup }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secretKey: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signIn(
        formData.email,
        formData.password,
        activeTab,
        formData.secretKey
      );

      if (response.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          navigate(activeTab === "user" ? "/userdashboard" : "/adminboard", {
            replace: true,
          });
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithGoogle(activeTab);
      if (response.success) {
        alert("Login successful!");
        onClose();
        navigate(activeTab === "user" ? "/userdashboard" : "/adminboard", {
          replace: true,
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <h3>Welcome back!</h3>
            <p>Login successful. Redirecting...</p>
          </div>
        </div>
      )}
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-btn">
              {activeTab === "user" ? "Sign in" : "Admin Sign in"}
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="google-btn"
            >
              Sign in with Google
            </button>
          </form>
          <p className="redirect-text">
            Don't have an account?{" "}
            <span onClick={switchToSignup} className="redirect-link">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
