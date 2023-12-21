import React, { useState } from "react";
import axios from "axios";
import "./forgotPassword.css";
import OrangeButton from "../orangeButton/OrangeButton";
import TextField from "@mui/material/TextField";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/forgot-password", { email });
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
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
