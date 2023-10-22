import React, { useEffect, useState } from "react";
import "./navbar.css";
import {
  RiMenu3Line,
  RiCloseLine,
  RiAccountCircleFill,
  RiArrowDownSLine,
} from "react-icons/ri";
import logo from "../../assets/logoDark.png";
import RegistrationForm from "../registrationForm/RegistrationForm";
import LoginForm from "../loginForm/LoginForm";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";
import ProfileAccount from "../profileAccountBig/ProfileAccountBig";
import Menu from "../menu/Menu";

const Navbar = ({ showLoginForm, setShowLoginForm }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (user.id !== "") {
      setLoggedIn(true);
    }
  }, [user]);

  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="wd--navbar-wrapper">
      <div className="wd--navbar">
        <div className="wd--navbar-links">
          <div className="wd--navbar-links-logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <Menu />
        </div>
        <div className="wd--navbar-sign">
          {loggedIn ? (
            <>
              <Link to="/add-post">
                <GoPlus
                  style={{ color: "white" }}
                  className="wd--navbar-sign--add-post"
                  size="40"
                />
              </Link>
              <ProfileAccount color={"#fff"} />
            </>
          ) : (
            <>
              <GoPlus
                style={{ color: "white" }}
                className="wd--navbar-sign--add-post"
                size="40"
                onClick={handleShowLoginForm}
              />
              <div>
                <button
                  type="button"
                  id="login-navbar"
                  onClick={handleShowLoginForm}
                >
                  Log in
                </button>
                <button
                  type="button"
                  id="register-navbar"
                  onClick={handleShowRegistrationForm}
                >
                  Sign up
                </button>
              </div>
            </>
          )}
        </div>

        <div className="wd--navbar-menu">
          <RiMenu3Line
            color="#3e3e3e"
            size="35"
            onClick={() => {
              setToggleMenu(true);
            }}
          />
          <Menu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        </div>
      </div>
      {showRegistrationForm && (
        <RegistrationForm
          onClose={handleCloseRegistrationForm}
          showLogin={handleShowLoginForm}
        />
      )}
      {showLoginForm && (
        <LoginForm
          onClose={handleCloseLoginForm}
          showRegistration={handleShowRegistrationForm}
        />
      )}
    </div>
  );
};

export default Navbar;
