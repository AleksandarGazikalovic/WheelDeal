import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./passwordInput.css";

const PasswordInput = ({
  handleInputChange,
  isValid,
  value,
  name,
  label,
  placeholder,
  showToggleIcon = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <div className="password-input-container">
      <input
        className={`password-input ${isPasswordFocused ? "focus" : ""}`}
        type={showPassword ? "text" : "password"}
        name={name}
        id={name}
        placeholder={placeholder || ""}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
        onChange={(e) => {
          const inputValue = e.target.value;
          handleInputChange(name, inputValue);
        }}
      />
      <label
        className={`password-label ${
          isPasswordFocused || value ? "active" : ""
        } ${isValid ? "valid" : isValid === false ? "invalid" : ""}`}
      >
        {label || "Password"}
      </label>
      {showToggleIcon && (
        <div
          className="password-toggle-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEye size={30} />
          ) : (
            <AiOutlineEyeInvisible size={30} />
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
