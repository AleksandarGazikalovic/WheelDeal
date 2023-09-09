import React, { useEffect, useState } from "react";
import "./navbar.css";
import {
  RiMenu3Line,
  RiCloseLine,
  RiAccountCircleFill,
  RiArrowDownSLine,
} from "react-icons/ri";
import logo from "../../assets/Logo.png";
import RegistrationForm from "../registrationForm/RegistrationForm";
import LoginForm from "../loginForm/LoginForm";
import { Link } from "react-router-dom";
import noAvatar from "../../assets/noAvatar.png";
import picture1 from "../../assets/TestImages/picture1.jpg";
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

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const user = useSelector((state) => state.user.userInfo);

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
          {user.name ? (
            <>
              <Link to="/add-post">
                <GoPlus
                  style={{ color: "white" }}
                  className="wd--navbar-sign--add-post"
                  size="40"
                />
              </Link>
              <div className="wd--navbar-sign--account">
                {user.img ? (
                  <div className="wd--navbar-sign--account-avatar">
                    <img src={user.img} alt="" />
                  </div>
                ) : (
                  <RiAccountCircleFill color="#5e5e5e" size="50" />
                )}
                <RiArrowDownSLine color="5e5e5e" size="50" />
              </div>
            </>
          ) : (
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
        <RegistrationForm onClose={handleCloseRegistrationForm} />
      )}
      {showLoginForm && <LoginForm onClose={handleCloseLoginForm} />}
    </>
  );
};

export default Navbar;
