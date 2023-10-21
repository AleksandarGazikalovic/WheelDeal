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

const Menu = () => (
  <>
    <p>
      <a href="#whatWD">How does WheelDeal work?</a>
    </p>
    <p>
      <a href="#podrska">Support</a>
    </p>
    <p>
      <a href="#politika">Privacy Policy</a>
    </p>
  </>
);

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
    <>
      <div className="wd--navbar">
        <div className="wd--navbar-links">
          <div className="wd--navbar-links-logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="wd--navbar-links-container">
            <Menu />
          </div>
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
              <Link to="/profile">
                <div className="wd--navbar-sign--account">
                  {user.profileImage ? (
                    <div className="wd--navbar-sign--account-avatar">
                      <img src={user.profileImage} alt="" />
                    </div>
                  ) : (
                    <RiAccountCircleFill color="#5e5e5e" size="50" />
                  )}
                  <RiArrowDownSLine color="5e5e5e" size="50" />
                </div>
              </Link>
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
          {toggleMenu ? (
            <RiCloseLine
              color="#3e3e3e"
              size="35"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#3e3e3e"
              size="35"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="wd--navbar-menu-container slide-fwd-center">
              <div className="wd--navbar-menu-container-links">
                <Menu />
              </div>
              <div className="wd--navbar-menu-container-links-sign">
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
            </div>
          )}
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
    </>
  );
};

export default Navbar;
