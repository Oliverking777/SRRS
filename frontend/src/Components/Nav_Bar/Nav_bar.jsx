import React, { useState } from "react";
import "./Nav_bar.css";
import { assets } from "../../assets/assets";
import LoginModal from "../Auth/LoginModal";
import SignUpModal from "../Auth/SignUpModal";

const Nav_bar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleclick = () => {
    window.location.href = "/";
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  return (
    <>
      <div className="nav_bar">
        <div className="left" onClick={handleclick}>
          <img src={assets.heart_rate} alt="" />
          <span>SRRS</span>
        </div>
        <div className="middle"></div>
        <div className="right">
          <button onClick={openSignupModal}>Create an account</button>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal 
          onClose={closeModals} 
          switchToSignup={openSignupModal} 
        />
      )}
      
      {showSignupModal && (
        <SignUpModal 
          onClose={closeModals} 
          switchToLogin={openLoginModal} 
        />
      )}
    </>
  );
};

export default Nav_bar;