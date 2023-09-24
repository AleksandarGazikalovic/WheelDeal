import React, { useState, useEffect, useRef } from "react";
import "./loginForm.css";
import { RiCloseLine } from "react-icons/ri";
import GoogleButton from "react-google-button";
import logo from "../../assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { ReactComponent as Loader } from "../../assets/spinner.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const LoginForm = ({ onClose, showRegistration }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState({
    email: undefined,
    password: undefined,
  });

  const handleInputChange = (name, value) => {
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if any of the fields is empty
    if (account.email === "" || account.password === "") {
      setErrorMessage("Please fill in all the fields.");
    } else {
      dispatch(
        loginUser({
          email: account.email,
          password: account.password,
        })
      );
      setErrorMessage(null);
    }
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

  return (
    <div className="login-form-overlay">
      <form
        className="login-form slide-top"
        id="style-7"
        onSubmit={handleLogin}
      >
        <div className="form-div">
          <h1 className="login-welcome">Login</h1>
          <RiCloseLine onClick={onClose} className="login-close" />
        </div>
        <div className="wd--login-form--div">
          <input
            required
            className="wd--login-form--div-input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={account.email}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          <label className="wd--login-form--div-label">Email</label>
        </div>
        <div className="wd--login-form--div">
          <input
            required
            className="wd--login-form--div-input"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            minLength={6}
            placeholder="Password"
            value={account.password}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          <label className="wd--login-form--div-label">Password</label>
          {showPassword ? (
            <AiOutlineEye
              className="wd--login-form--div-eye"
              onClick={() => setShowPassword(!showPassword)}
              size={30}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="wd--login-form--div-eye"
              onClick={() => setShowPassword(!showPassword)}
              size={30}
            />
          )}
        </div>
        <div className="forgot-password">
          <a rel="noopener noreferrer" href="#">
            Forgot Password?
          </a>
        </div>
        {error && (
          <span className="error-msg">
            Failed to log in! Please check your credentials.
          </span>
        )}
        {errorMessage && <span className="error-msg">{errorMessage}</span>}
        <button className="login-button" type="submit" disabled={pending}>
          {!pending ? "Log in" : <Loader className="spinner" />}
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
    </div>
  );
};

export default LoginForm;
