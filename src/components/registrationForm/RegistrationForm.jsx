import React, { useState, useEffect, useRef } from "react";
import "./registrationForm.css";
import { RiCloseLine } from "react-icons/ri";
import GoogleButton from "react-google-button";
import logo from "../../assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/userSlice";
import { ReactComponent as Loader } from "../../assets/spinner.svg";

const RegistrationForm = ({ onClose }) => {
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userInfo);

  const handleRegistration = (e) => {
    e.preventDefault();

    // Check if any of the fields is empty
    if (
      name.current.value === "" ||
      surname.current.value === "" ||
      email.current.value === "" ||
      password.current.value === "" ||
      repeatPassword.current.value === ""
    ) {
      setErrorMessage("Please fill in all the fields.");
    } else if (password.current.value !== repeatPassword.current.value) {
      // Check if passwords match
      setErrorMessage("Passwords do not match.");
    } else {
      dispatch(
        registerUser({
          name: name.current.value,
          surname: surname.current.value,
          email: email.current.value,
          password: password.current.value,
        })
      );
      setErrorMessage(null);
      if (!error) {
        onClose();
      }
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose(); // Call the onClose function passed as a prop to close the registration window
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
    <div className="registration-form-overlay">
      <form
        className="registration-form slide-top"
        id="style-7"
        onSubmit={handleRegistration}
      >
        <div className="form-div">
          <h1 className="registration-welcome">Come Deal the Wheel with us!</h1>
          <RiCloseLine onClick={onClose} className="registration-close" />
        </div>

        <label htmlFor="firstname">Name</label>
        <input
          type="text"
          className="registration-input"
          id="firstname"
          placeholder="Name"
          minLength={3}
          ref={name}
        />
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          className="registration-input"
          id="surname"
          placeholder="Surname"
          minLength={3}
          ref={surname}
        />
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          className="registration-input"
          placeholder="Email"
          ref={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="Password"
          id="password"
          className="registration-input"
          placeholder="Password"
          minLength={6}
          ref={password}
        />
        <label htmlFor="repeat-password">Repeat password</label>
        <input
          type="Password"
          id="repeat-password"
          className="registration-input"
          placeholder="Password"
          minLength={6}
          ref={repeatPassword}
        />
        {error && (
          <span className="error-msg">
            Account with this email address already exists!
          </span>
        )}
        {errorMessage && <span className="error-msg">{errorMessage}</span>}
        <button
          className="registration-button"
          type="submit"
          disabled={pending}
        >
          {!pending ? "Sign up" : <Loader className="spinner" />}
        </button>

        {/* <div className="registration-line">
          <span>ili</span>
        </div>
        <GoogleButton className="google-button" /> */}
      </form>
    </div>
  );
};

export default RegistrationForm;
