import React, { useState } from "react";
import axios from "axios";
import "./forgotPassword.css";
import TextField from "@mui/material/TextField";
import { ReactComponent as Loader } from "../../assets/spinner.svg";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const ForgotPassword = ({ handleGoBack }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const response = await axios.post( API_ENDPOINT + "/auth/forgot-password", { email });
      setPending(false);
      setSuccess(true);

      console.log("Forgot password request successful", response.data);
    } catch (error) {
      console.error("Error sending forgot password request", error);
    }
  };

  return success ? (
    <div className="forgot-password-form">
      <h1>Forgot Password?</h1>
      <p>
        If an account with the email address you entered exists, you will
        receive an email with a link to reset your password.
      </p>
    </div>
  ) : (
    <div className="forgot-password-form">
      <h1>Forgot Password?</h1>
      <p>
        Enter your email address below and we'll send you a link to reset your
        password.
      </p>
      <form onSubmit={handleForgotPassword}>
        <TextField
          id="forgotPasswordEmail"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          sx={{ width: 300 }}
        />

        <button className="login-button" type="submit">
          {!pending ? "Confirm" : <Loader className="spinner" />}
        </button>
      </form>
      <button className="login-back-btn" onClick={handleGoBack}>
        Go back
      </button>
    </div>
  );
};

export default ForgotPassword;
