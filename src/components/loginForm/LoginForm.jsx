import React, { useState, useEffect } from "react";
import "./loginForm.css";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  loginUserThirdParty,
  removeError,
} from "../../redux/userSlice";
import { ReactComponent as Loader } from "../../assets/spinner.svg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import PasswordInput from "../passwordInput/PasswordInput";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

const facebook_app_id = process.env.REACT_APP_FACEBOOK_APP_ID;

const LoginForm = ({ onClose, showRegistration }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
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

  // function for extracting payload from jwt token
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const handleGoogleLogin = (response) => {
    const userData = parseJwt(response?.credential);
    dispatch(
      loginUserThirdParty({
        email: userData.email,
        externID: userData.sub,
      })
    ).then((result) => {
      if (loginUserThirdParty.fulfilled.match(result)) {
        navigate("/profile"); // Successful login with Google
      } else {
        console.log(result.payload);
        setErrorMessage(result.payload);
      }
    });
  };

  const handleFacebookLogin = (response) => {
    const userData = response;
    dispatch(
      loginUserThirdParty({
        email: userData.email,
        externID: userData.id,
      })
    ).then((result) => {
      if (loginUserThirdParty.fulfilled.match(result)) {
        navigate("/profile"); // Successful login with Facebook
      } else {
        console.log(result.payload);
        setErrorMessage(result.payload);
      }
    });
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setErrorMessage(null); // Clear the error message
        dispatch(removeError());
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
              isValid={isPasswordValid}
              name={"password"}
              label={"Password"}
            />
            {/* {error && (
              <span className={`error-msg-login ${isShaking ? "shaking" : ""}`}>
                {error}
              </span>
            )} */}
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
              {/* <FcGoogle size={40} className="icon" /> */}
              <GoogleLogin
                size="large"
                type="icon"
                theme="outline"
                onSuccess={(credentialResponse) =>
                  handleGoogleLogin(credentialResponse)
                }
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              {/* <FaFacebook size={40} className="icon" /> */}
              {/* <div style={{width: "25%"}}> */}
              <FacebookLogin
                buttonStyle={{ height: 41, width: 40, borderRadius: 4 }}
                textButton=""
                appId={facebook_app_id}
                autoLoad={false}
                fields="name,email"
                scope="public_profile, email"
                callback={(response) => handleFacebookLogin(response)}
                cssClass="my-facebook-button-class"
                icon={<FaFacebook size={26} className="icon" />}
              />
              {/* </div> */}
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
