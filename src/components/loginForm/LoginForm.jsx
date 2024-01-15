import React, { useState, useEffect } from "react";
import "./loginForm.css";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { ReactComponent as Loader } from "../../assets/spinner.svg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import PasswordInput from "../passwordInput/PasswordInput";

const LoginForm = ({ onClose, showRegistration }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    validateInput(name, value);
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        if (!value.trim()) {
          setErrorMessage("Email is required");
          setIsEmailValid(false);
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          setErrorMessage("Invalid email format");
          setIsEmailValid(false);
        } else {
          setErrorMessage(null);
          setIsEmailValid(true);
        }
        break;

      case "password":
        if (!value.trim()) {
          setErrorMessage("Password is required");
          setIsPasswordValid(false);
        } else {
          setErrorMessage(null);
          setIsPasswordValid(true);
        }
        break;

      default:
        break;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      validateInput("password", account.password);
    }
    if (!isEmailValid) {
      validateInput("email", account.email);
    }

    if (!isEmailValid || !isPasswordValid) return;

    // Check if any of the fields is empty
    dispatch(
      loginUser({
        email: account.email,
        password: account.password,
      })
    ).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate("/profile"); // Successful login
      } else {
        console.log(result.payload);
        setErrorMessage(result.payload);
      }
    });
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose(); // Call the onClose function passed as a prop to close the login window
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleEscapeKey);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 300);
  };

  return (
    <div className="login-form-overlay">
      <div className="login-form slide-top">
        <RiCloseLine onClick={onClose} className="login-close" />
        {showForgotPassword ? (
          <ForgotPassword handleGoBack={handleForgotPassword} />
        ) : (
          <form className="form-wrapper" onSubmit={handleLogin}>
            <h1 className="login-welcome">Login</h1>
            <div className="wd--registration-form--div">
              <input
                className={`wd--registration-form--div-input  ${
                  isEmailFocused ? "focus" : ""
                }`}
                type="email"
                name="email"
                id="email"
                value={account.email}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange("email", value);
                }}
              />
              <label
                className={`wd--registration-form--div-label  ${
                  !isEmailFocused && !account.email
                    ? ""
                    : !isEmailFocused && !isEmailValid
                    ? "invalid"
                    : !isEmailFocused && isEmailValid
                    ? "valid"
                    : isEmailValid
                    ? "valid"
                    : "invalid"
                }`}
              >
                Email
              </label>
            </div>
            <PasswordInput
              handleInputChange={handleInputChange}
              isPasswordValid={isPasswordValid}
              account={account}
            />
            {error && (
              <span className={`error-msg-login ${isShaking ? "shaking" : ""}`}>
                {errorMessage}
              </span>
            )}
            {errorMessage && (
              <span className={`error-msg-login ${isShaking ? "shaking" : ""}`}>
                {errorMessage}
              </span>
            )}
            <button
              className="login-button"
              type="submit"
              onClick={handleShake}
              disabled={pending}
            >
              {!pending ? "Log in" : <Loader className="spinner" />}
            </button>
            <button
              className="forgot-password"
              rel="noopener noreferrer"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
            <div className="or-line">
              <span></span>
              <span>or</span>
              <span></span>
            </div>
            <div className="social-icons">
              <FcGoogle size={40} className="icon" />
              <FaFacebook size={40} className="icon" />
            </div>
            <p className="signup">
              Don't have an account? &nbsp;
              <button
                type="button"
                onClick={() => {
                  showRegistration();
                  onClose();
                }}
              >
                Sign up
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
