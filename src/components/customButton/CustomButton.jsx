import React from "react";
import "./customButton.css";

const CustomButton = ({
  text,
  action,
  disabled,
  width,
  backgroundColor,
  disabledBackgroundColor,
  hoverText,
}) => {
  return (
    <button
      className="custom-button"
      type="submit"
      disabled={disabled}
      onClick={action}
      style={{
        width: width,
        backgroundColor: !disabled ? backgroundColor : disabledBackgroundColor,
      }}
      title={hoverText}
    >
      {text}
    </button>
  );
};

export default CustomButton;
