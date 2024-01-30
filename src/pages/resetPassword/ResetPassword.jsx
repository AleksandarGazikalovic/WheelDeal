import React, { useEffect, useState } from "react";
import { OrangeButton, PasswordInput } from "../../components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./resetPassword.css";
import logoDark from "../../assets/logoDark.png";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const ResetPassword = () => {
  const { token } = useParams();
  const [account, setAccount] = useState({ password: "", confirmPassword: "" });
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "password":
        if (!value.trim()) {
          setErrorMessage("Password is required");
          setIsPasswordValid(false);
        } else if (value.length < 7) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
          setIsPasswordValid(false);
        } else if (!/[A-Z]/.test(value)) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
          setIsPasswordValid(false);
        } else if (!/\d/.test(value)) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
          setIsPasswordValid(false);
        } else {
          setErrorMessage(null);
          setIsPasswordValid(true);
        }
        break;

      case "confirmPassword":
        if (!value.trim()) {
          setErrorMessage("Password is required");
          setIsConfirmPasswordValid(false);
        } else if (value.length < 7) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
          setIsConfirmPasswordValid(false);
        } else if (!/[A-Z]/.test(value)) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
          setIsConfirmPasswordValid(false);
        } else if (!/\d/.test(value)) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
          setIsConfirmPasswordValid(false);
        } else {
          setErrorMessage(null);
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
        await axios.post( API_ENDPOINT + `/auth/reset-password/${token}`, {
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

  return (
    <div className="wd--reset-password">
      <div className="wd--reset-logo">
        <Link to="/">
          <img src={logoDark} alt="" />
        </Link>
      </div>
      <div className="wd--reset-password--container">
        {success ? (
          <>
            <h2>Success!</h2>
            <p>Your password has been reset successfully.</p>
            <OrangeButton
              text={"Go back"}
              action={() => window.location.replace("/")}
            />
          </>
        ) : (
          <>
            <PasswordInput
              handleInputChange={handleInputChange}
              isValid={isPasswordValid}
              name="password"
              label={"New Password"}
            />
            <PasswordInput
              handleInputChange={handleInputChange}
              isValid={isConfirmPasswordValid}
              name="confirmPassword"
              label={"Confirm Password"}
            />
            <span className="wd--reset-password--container-error">
              {errorMessage}
            </span>
            <OrangeButton text={"Reset Password"} action={resetPassword} />
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
