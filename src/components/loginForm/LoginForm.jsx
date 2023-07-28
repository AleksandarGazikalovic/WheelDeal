import React, { useState, useEffect } from "react";
import "./loginForm.css";
import { RiCloseLine } from "react-icons/ri";
import GoogleButton from "react-google-button";
import logo from "../../assets/Logo.png";

const LoginForm = ({ onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose(); // Call the onClose function passed as a prop to close the login window
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleEscapeKey);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div className="login-form-overlay">
      <div className="login-form scale-up-center">
        <RiCloseLine onClick={onClose} className="login-close" />
        <img src={logo} className="login-logo" alt="" />
        <label htmlFor=""></label>
        <input type="Email" className="login-input" placeholder="Email" />
        <input type="Password" className="login-input" placeholder="Lozinka" />
        <div className="login-line">
          <span>ili</span>
        </div>
        <GoogleButton className="google-button" />
      </div>
    </div>
  );
};

export default LoginForm;
