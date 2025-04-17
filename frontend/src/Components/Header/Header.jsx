import React, { useState } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import SignUpModal from "../Auth/SignUpModal";
import LoginModal from "../Auth/LoginModal";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

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
      <div className="header">
        <div className="componets">
          <div className="header_titles">
            <img src={assets.heart_rate} alt="" />
            <p>Sickness Recording & Reporting System</p>
          </div>
          <div className="des">
            <span>
              A comprehensive platform for recording, tracking, and analyzing
              sickness data across different regions.
            </span>
          </div>
          <div className="headerbuttons">
            <div className="get_started" onClick={openSignupModal}>
              <span>Get Started</span>
              <img src={assets.arrow_right} alt="" />
            </div>
            <div className="sign" onClick={openLoginModal}>
              <span>Sign In</span>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={closeModals} switchToSignup={openSignupModal} />
      )}

      {showSignupModal && (
        <SignUpModal onClose={closeModals} switchToLogin={openLoginModal} />
      )}
    </>
  );
};

export default Header;