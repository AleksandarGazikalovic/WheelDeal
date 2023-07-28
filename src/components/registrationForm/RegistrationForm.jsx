import React, { useState, useEffect } from "react";
import "./registrationForm.css";
import { RiCloseLine } from "react-icons/ri";
import GoogleButton from "react-google-button";
import logo from "../../assets/Logo.png";

const RegistrationForm = ({ onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose(); // Call the onClose function passed as a prop to close the registration window
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
    <div className="registration-form-overlay">
      <form className="registration-form scale-up-center">
        <RiCloseLine onClick={onClose} className="registration-close" />
        <img src={logo} className="registration-logo" alt="" />
        <input
          type="text"
          className="registration-input"
          id="username"
          placeholder="Korisničko ime"
        />
        <input
          type="Email"
          id="email"
          className="registration-input"
          placeholder="Email"
        />
        <input
          type="Password"
          id="password"
          className="registration-input"
          placeholder="Lozinka"
        />
        <input
          type="Password"
          id="repeat-password"
          className="registration-input"
          placeholder="Ponovite lozinku"
        />
        <div className="registration-line">
          <span>ili</span>
        </div>
        <GoogleButton className="google-button" />
      </form>
    </div>
  );
};

export default RegistrationForm;
