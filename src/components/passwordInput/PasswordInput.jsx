import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./passwordInput.css";

const PasswordInput = ({
  handleInputChange,
  isPasswordValid,
  account,
  name,
  text,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  return (
    <div className="wd--registration-form--div">
      <input
        className={`wd--registration-form--div-input  ${
          isPasswordFocused ? "focus" : ""
        }`}
        type={showPassword ? "text" : "password"}
        name={`${name} || password`}
        id={`${name} || password`}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
        onChange={(e) => {
          const value = e.target.value;
          handleInputChange(name, value);
        }}
      />
      <label
        className={`wd--registration-form--div-label  ${
          !isPasswordFocused && !account.password
            ? ""
            : !isPasswordFocused && !isPasswordValid
            ? "invalid"
            : !isPasswordFocused && isPasswordValid
            ? "valid"
            : isPasswordValid
            ? "valid"
            : "invalid"
        }`}
      >
        {text || "Password"}
      </label>
      {showPassword ? (
        <AiOutlineEye
          className="wd--registration-form--div-eye"
          onClick={() => setShowPassword(!showPassword)}
          size={30}
        />
      ) : (
        <AiOutlineEyeInvisible
          className="wd--registration-form--div-eye"
          onClick={() => setShowPassword(!showPassword)}
          size={30}
        />
      )}
    </div>
  );
};

export default PasswordInput;
