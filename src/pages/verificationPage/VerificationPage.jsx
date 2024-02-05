// VerificationPage.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./verificationPage.css"; // Import your CSS file

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const VerificationPage = () => {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.get( API_ENDPOINT + `/auth/verify/${token}`);
        setVerified(true);
      } catch (error) {
        setVerified(false);
        console.log(error);
      }
    };
    verifyUser();
  }, [token]);

  return (
    <div className="wd--verification-container">
      {verified ? (
        <div className="wd--verification-container--success-container">
          <h2>Verification Successful!</h2>
          <p>Your email has been successfully verified.</p>
          <p>Thank you for confirming your email address.</p>
          <Link to="/" className="wd--verification-container--home-link">
            Go to Home
          </Link>
        </div>
      ) : (
        <div className="wd--verification-container--error-container">
          <h2>Verification Failed!</h2>
          <p>There was an error verifying your email.</p>
          <p>Please try again.</p>
          <Link to="/" className="wd--verification-container--home-link">
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
