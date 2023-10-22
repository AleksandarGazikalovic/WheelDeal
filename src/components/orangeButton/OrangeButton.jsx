import React from "react";
import "./orangeButton.css";

const OrangeButton = ({ text, action }) => {
  return (
    <button className="orange-button" type="button" onClick={action}>
      {text}
    </button>
  );
};

export default OrangeButton;
