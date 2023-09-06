import React, { useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/Logo.png";
import RegistrationForm from "../registrationForm/RegistrationForm";
import LoginForm from "../loginForm/LoginForm";
import { Link } from "react-router-dom";

const Menu = () => (
  <>
    <p>
      <a href="#whatWD">Kako radi WheelDeal?</a>
    </p>
    <p>
      <a href="#podrska">Podrška</a>
    </p>
    <p>
      <a href="#politika">Politika privatnosti</a>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

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
          <button type="button" id="login" onClick={handleShowLoginForm}>
            Prijava
          </button>
          <button
            type="button"
            id="register"
            onClick={handleShowRegistrationForm}
          >
            Registracija
          </button>
        </div>
        <div className="wd--navbar-menu">
          {toggleMenu ? (
            <RiCloseLine
              color="#fff"
              size="27"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#fff"
              size="27"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="wd--navbar-menu-container slide-fwd-center">
              <div className="wd--navbar-menu-container-links">
                <Menu />
              </div>
              <div className="wd--navbar-menu-container-links-sign">
                <button type="button" id="login" onClick={handleShowLoginForm}>
                  Prijava
                </button>
                <button
                  type="button"
                  id="register"
                  onClick={handleShowRegistrationForm}
                >
                  Registracija
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
