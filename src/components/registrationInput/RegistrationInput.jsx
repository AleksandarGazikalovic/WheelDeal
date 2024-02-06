import React, { useState, useEffect } from "react";
import { ReactComponent as Loader } from "../../assets/spinner.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, registerUserThirdParty, removeError } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./registrationInput.css";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

const facebook_app_id = process.env.REACT_APP_FACEBOOK_APP_ID

const RegistrationInput = ({ onClose, showLogin, setSuccesful }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isSurnameFocused, setIsSurnameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isSurnameValid, setIsSurnameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(removeError())
  }, [onClose]);

  const handleInputChange = (name, value) => {
    validateInput(name, value);
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          setErrorMessage("Name is required");
          setIsNameValid(false);
        } else if (value.length < 3) {
          setErrorMessage("Name should be at least 3 characters long");
          setIsNameValid(false);
        } else {
          setErrorMessage(null);
          setIsNameValid(true);
        }
        break;

      case "surname":
        if (!value.trim()) {
          setErrorMessage("Surname is required");
          setIsSurnameValid(false);
        } else if (value.length < 3) {
          setErrorMessage("Surname should be at least 3 characters long");
          setIsSurnameValid(false);
        } else {
          setErrorMessage(null);
          setIsSurnameValid(true);
        }
        break;

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
        } else if (value.length < 7) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
          setIsPasswordValid(false);
        } else if (!/[A-Z]/.test(value)) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
          setIsPasswordValid(false);
        } else if (!/\d/.test(value)) {
          setErrorMessage(
            "Password requirements: 7 characters, one uppercase letter and one digit"
          );
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

  // function for extracting payload from jwt token
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const handleGoogleRegistration = (response) => {
    console.log(response)
    const userData = parseJwt(response?.credential)
    dispatch(
      registerUserThirdParty({
        email: userData.email,
        externID: userData.sub, // ovo isto obavezno hesiraj, umesto lozinke
        name: userData.given_name,
        surname: userData.family_name,
        thirdParty: "google"
      })
    ).then((result) => {
      if (registerUserThirdParty.fulfilled.match(result)) {
        navigate("/profile"); // Successful registration with Google
      } else {
        console.log(result.payload);
        setErrorMessage(result.payload);
      }
    });
  }

  const handleFacebookRegistration = (response) => {
    console.log(response)
    const userData = response
    dispatch(
      registerUserThirdParty({
        email: userData.email,
        externID: userData.id, // ovo isto obavezno hesiraj, umesto lozinke
        name: userData.name.split(" ")[0],
        surname: userData.name.split(" ").slice(1).join(" "),
        thirdParty: "facebook"
      })
    ).then((result) => {
      if (registerUserThirdParty.fulfilled.match(result)) {
        navigate("/profile"); // Successful registration with Google
      } else {
        console.log(result.payload);
        setErrorMessage(result.payload);
      }
    });
  }
 
  const handleRegistration = (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      validateInput("password", account.password);
    }
    if (!isEmailValid) {
      validateInput("email", account.email);
    }
    if (!isSurnameValid) {
      validateInput("surname", account.surname);
    }
    if (!isNameValid) {
      validateInput("name", account.name);
    }

    if (!isNameValid || !isSurnameValid || !isEmailValid || !isPasswordValid)
      return;

    // Form is valid, you can submit the data
    dispatch(
      registerUser({
        name: account.name,
        surname: account.surname,
        email: account.email,
        password: account.password,
      })
    ).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        setSuccesful(true); // Successful registration
      } else {
        console.log(result.payload);
        setErrorMessage(result.payload);
      }
    });
    // .then((result) => {
    //   if (!registerUser.rejected.match(result)) {
    //     setSuccesful(true);
    //   }
    //   else{
    //     console.log(result.payload);
    //     setErrorMessage(result);
    //   }
    // });
    // .then((result) => {
    //   if (registerUser.fulfilled.match(result)) {
    //     navigate("/profile"); // Successful login
    //   }
    // });
  };

  return (
    <form className="form-wrapper" onSubmit={handleRegistration}>
      <section>
        <div className="wd--registration-form--div">
          <input
            className={`wd--registration-form--div-input  ${
              isNameFocused ? "focus" : ""
            }`}
            type="text"
            name="name"
            id="name"
            value={account.name}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange("name", value);
              validateInput("name", value);
            }}
          />
          <label
            className={`wd--registration-form--div-label  ${
              !isNameFocused && !account.name
                ? ""
                : !isNameFocused && !isNameValid
                ? "invalid"
                : !isNameFocused && isNameValid
                ? "valid"
                : isNameValid
                ? "valid"
                : "invalid"
            }`}
          >
            Name
          </label>
        </div>

        <div className="wd--registration-form--div">
          <input
            className={`wd--registration-form--div-input  ${
              isSurnameFocused ? "focus" : ""
            }`}
            type="text"
            name="surname"
            id="surname"
            value={account.surname}
            onFocus={() => setIsSurnameFocused(true)}
            onBlur={() => setIsSurnameFocused(false)}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange("surname", value);
              validateInput("surname", value);
            }}
          />
          <label
            className={`wd--registration-form--div-label  ${
              !isSurnameFocused && !account.surname
                ? ""
                : !isSurnameFocused && !isSurnameValid
                ? "invalid"
                : !isSurnameFocused && isSurnameValid
                ? "valid"
                : isSurnameValid
                ? "valid"
                : "invalid"
            }`}
          >
            Surname
          </label>
        </div>
      </section>
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
            validateInput("email", value);
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
      <div className="wd--registration-form--div">
        <input
          className={`wd--registration-form--div-input  ${
            isPasswordFocused ? "focus" : ""
          }`}
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={account.password}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onChange={(e) => {
            const value = e.target.value;
            handleInputChange("password", value);
            validateInput("password", value);
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
          Password
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
      {/* {error && (
        <span
          className="error-msg-register"
          style={{
            display: `${error ? "flex" : ""}`,
          }}
        >
          Account with this email address already exists!
        </span>
      )} */}
      <span
        className={`error-msg-register ${isShaking ? "shaking" : ""}`}
        style={{
          display: `${
            (errorMessage && !isNameFocused) ||
            (errorMessage && !isSurnameFocused) ||
            (errorMessage && !isEmailFocused) ||
            (errorMessage && !isPasswordFocused)
              ? "flex"
              : ""
          }`,
        }}
      >
        {errorMessage}
      </span>
      <button
        className="registration-button"
        type="submit"
        disabled={pending}
        onClick={() => {
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
          }, 500);
        }}
      >
        {!pending ? "Sign up" : <Loader className="spinner" />}
      </button>

      <div className="or-line">
        <span></span>
        <span>or</span>
        <span></span>
      </div>
      <div className="social-icons">
        {/* <FcGoogle size={40} className="icon" /> */}
        <GoogleLogin size="large" type="icon" theme="outline"
          onSuccess={credentialResponse => handleGoogleRegistration(credentialResponse)}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <FacebookLogin
        textButton=""
          appId={facebook_app_id}
          autoLoad={false}
          fields="name,email"
          scope="public_profile, email"
          callback={response => handleFacebookRegistration(response)}
          cssClass="my-facebook-button-class"
          icon={<FaFacebook size={33} className="icon" />}
          size="medium"
        />
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
  );
};

export default RegistrationInput;
