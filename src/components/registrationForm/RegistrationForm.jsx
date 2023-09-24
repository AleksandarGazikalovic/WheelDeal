import React, { useState, useEffect, useRef } from "react";
import "./registrationForm.css";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/userSlice";
import { ReactComponent as Loader } from "../../assets/spinner.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const RegistrationForm = ({ onClose, showLogin }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    name: undefined,
    surname: undefined,
    email: undefined,
    password: undefined,
  });

  const handleInputChange = (name, value) => {
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    // Check if any of the fields is empty
    if (
      account.name === "" ||
      account.surname === "" ||
      account.email === "" ||
      account.password === ""
    ) {
      setErrorMessage("Please fill in all the fields.");
    } else {
      dispatch(
        registerUser({
          name: account.name,
          surname: account.surname,
          email: account.email,
          password: account.password,
        })
      );
      setErrorMessage(null);
      if (!error) {
        onClose();
      }
    }
  };
  console.log(account);

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

        <section>
          <div className="wd--registration-form--div">
            <input
              required
              className="wd--registration-form--div-input"
              type="text"
              name="name"
              id="name"
              minLength={3}
              value={account.name}
              placeholder="Name"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            <label className="wd--registration-form--div-label">Name</label>
          </div>

          <div className="wd--registration-form--div">
            <input
              required
              className="wd--registration-form--div-input"
              type="text"
              name="surname"
              id="surname"
              minLength={3}
              placeholder="Surname"
              value={account.surname}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            <label className="wd--registration-form--div-label">Surname</label>
          </div>
        </section>
        <div className="wd--registration-form--div">
          <input
            required
            className="wd--registration-form--div-input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={account.email}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          <label className="wd--registration-form--div-label">Email</label>
        </div>
        <div className="wd--registration-form--div">
          <input
            required
            className="wd--registration-form--div-input"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            minLength={6}
            placeholder="Password"
            value={account.password}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          <label className="wd--registration-form--div-label">Password</label>
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

        <div className="or-line">
          <span></span>
          <span>or</span>
          <span></span>
        </div>
        <div className="social-icons">
          <FcGoogle size={40} className="icon" />
          <FaFacebook size={40} className="icon" />
        </div>
        <p className="login">
          Already have an account? &nbsp;
          <button
            type="button"
            onClick={() => {
              showLogin();
              onClose();
            }}
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
