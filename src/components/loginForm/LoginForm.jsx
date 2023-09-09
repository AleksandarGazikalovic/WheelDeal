import React, { useState, useEffect, useRef } from "react";
import "./loginForm.css";
import { RiCloseLine } from "react-icons/ri";
import GoogleButton from "react-google-button";
import logo from "../../assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { ReactComponent as Loader } from "../../assets/spinner.svg";

const LoginForm = ({ onClose }) => {
  const email = useRef();
  const password = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userInfo);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if any of the fields is empty
    if (email.current.value === "" || password.current.value === "") {
      setErrorMessage("Please fill in all the fields.");
    } else {
      dispatch(
        loginUser({
          email: email.current.value,
          password: password.current.value,
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
          <h1 className="login-welcome">Log in form</h1>
          <RiCloseLine onClick={onClose} className="login-close" />
        </div>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          className="login-input"
          placeholder="Email"
          ref={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="Password"
          id="password"
          className="login-input"
          placeholder="Password"
          minLength={6}
          ref={password}
        />
        {error && (
          <span className="error-msg">
            Failed to login! Please check your credentials.
          </span>
        )}
        {errorMessage && <span className="error-msg">{errorMessage}</span>}
        <button className="login-button" type="submit" disabled={pending}>
          {!pending ? "Login" : <Loader className="spinner" />}
        </button>

        {/* <div className="login-line">
          <span>ili</span>
        </div>
        <GoogleButton className="google-button" /> */}
      </form>
    </div>
  );
};

export default LoginForm;
