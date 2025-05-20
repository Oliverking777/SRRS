import React, { useState } from "react";
import "./Modal.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  signUp,
  signInWithGoogle,
} from "../../../backend copy/services/authService";

const SignUpModal = ({ onClose, switchToLogin }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretKey: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleGoogleSignUp = async () => {
    try {
      const response = await signInWithGoogle(activeTab);
      if (response.success) {
        alert("Account created successfully!");
        if (activeTab === "admin") {
          navigate("/adminboard");
        } else {
          switchToLogin();
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    try {
      const response = await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        activeTab,
        formData.secretKey
      );

      if (response.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          switchToLogin();
        }, 3000);
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
      {showSuccessPopup && (
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
            <h3>Success!</h3>
            <p>
              Account created successfully! Please check your email for
              verification.
            </p>
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
          <h2>Create an account</h2>
          <p>Enter your details to create your account</p>
          {error && (
            <p
              className="error-text"
              style={{ color: "#EF4444", marginBottom: 16 }}
            >
              {error}
            </p>
          )}
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
            </div>{" "}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
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
                placeholder="Re-enter password"
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
                I agree to the{" "}
                <span className="terms-link">terms and conditions</span>
              </label>
            </div>
            <button type="submit" className="submit-btn">
              {activeTab === "user" ? "Create account" : "Create admin account"}
            </button>
          </form>
          <button className="google-signup-btn" onClick={handleGoogleSignUp}>
            Sign up with Google
          </button>
          <p className="redirect-text">
            Already have an account?{" "}
            <span onClick={switchToLogin} className="redirect-link">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
