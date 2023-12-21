import React from "react";
import { FcApproval } from "react-icons/fc";
import "./emailVerification.css";

const EmailVerification = () => {
  return (
    <div className="wd--email-verification">
      <div>
        <FcApproval size={100} />
      </div>
      <div>
        <p>Thank you for joining us!</p>
        <p>Please check your email for verification.</p>
      </div>
    </div>
  );
};

export default EmailVerification;
