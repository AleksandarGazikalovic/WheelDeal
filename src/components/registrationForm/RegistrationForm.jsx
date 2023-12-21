import React, { useState, useEffect } from "react";
import "./registrationForm.css";
import { RiCloseLine } from "react-icons/ri";
import RegistrationInput from "../registrationInput/RegistrationInput";
import EmailVerification from "../emailVerification/EmailVerification";
import { useSelector } from "react-redux";

const RegistrationForm = ({ onClose, showLogin }) => {
  const { error } = useSelector((state) => state.user);
  const [succesful, setSuccesful] = useState(false);
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
      <div className="registration-form slide-top">
        <h1 className="registration-welcome">Deal the Wheel with us!</h1>
        <RiCloseLine onClick={onClose} className="registration-close" />
        {!succesful ? (
          <RegistrationInput
            showLogin={showLogin}
            onClose={onClose}
            setSuccesful={setSuccesful}
          />
        ) : (
          <EmailVerification />
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
