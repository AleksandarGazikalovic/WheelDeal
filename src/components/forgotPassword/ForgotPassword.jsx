import React, { useEffect, useState } from "react";
import axios from "axios";
import "./forgotPassword.css";
import TextField from "@mui/material/TextField";
import { ReactComponent as Loader } from "../../assets/spinner.svg";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const ForgotPassword = ({ handleGoBack }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
  }, [])

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setPending(true);
    await axios.post( API_ENDPOINT + "/auth/forgot-password", { email })
      .then((response) => {
        // Handle response
        setPending(false);
        setSuccess(true);
        setError(null)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setError(error.response.data)
        } else {
          console.log(error)
        }
        setPending(false);
      }
    )

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
        {error && (
          <span
            className="error-msg-forgot-password"
            style={{
              display: `${error ? "flex" : ""}`,
            }}
          >
            {error}
          </span>
        )}
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
