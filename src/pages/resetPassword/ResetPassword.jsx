import React, { useEffect, useState } from "react";
import { OrangeButton, PasswordInput } from "../../components";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./resetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [account, setAccount] = useState({ password: "", confirmPassword: "" });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "password":
        if (!value.trim()) {
          setIsPasswordValid(false);
        } else {
          setIsPasswordValid(true);
        }
        break;

      case "confirmPassword":
        if (!value.trim()) {
          setIsConfirmPasswordValid(false);
        } else {
          setIsConfirmPasswordValid(true);
        }
        break;

      default:
        break;
    }
  };

  const handleInputChange = (name, value) => {
    validateInput(name, value);
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const resetPassword = async (e) => {
    if (account.password === "" || account.confirmPassword === "") {
      setErrorMessage("Please fill out all fields");
      return;
    }
    e.preventDefault();
    if (account.password === account.confirmPassword) {
      try {
        await axios.post(`/auth/reset-password/${token}`, {
          newPassword: account.password,
        });
        setSuccess(true);
      } catch (err) {
        setErrorMessage(err.response.data.error);
      }
    } else {
      setErrorMessage("Passwords do not match");
    }
  };

  return !success ? (
    <div className="wd--reset-password">
      <div className="wd--reset-password--container">
        <h2>Success!</h2>
        <p>Your password has been reset successfully.</p>
        <OrangeButton
          text={"Go back"}
          action={() => window.location.replace("/")}
        />
      </div>
    </div>
  ) : (
    <div className="wd--reset-password">
      <div className="wd--reset-password--container">
        <PasswordInput
          handleInputChange={handleInputChange}
          isPasswordValid={isPasswordValid}
          account={account}
          name="password"
          text={"New Password"}
        />
        <PasswordInput
          handleInputChange={handleInputChange}
          isConfirmPasswordValid={isConfirmPasswordValid}
          account={account}
          name="confirmPassword"
          text={"Confirm Password"}
        />
        <span className="wd--reset-password--container-error">
          {errorMessage}
        </span>
        <OrangeButton text={"Reset Password"} action={resetPassword} />
      </div>
    </div>
  );
};

export default ResetPassword;
