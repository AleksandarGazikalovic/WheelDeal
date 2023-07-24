import React, { useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/Logo.png";

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
  return (
    <div className="wd--navbar">
      <div className="wd--navbar-links">
        <div className="wd--navbar-links-logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="wd--navbar-links-container">
          <Menu />
        </div>
      </div>
      <div className="wd--navbar-sign">
        <p>Prijavi se</p>
        <button type="button">Registracija</button>
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
              <p>Prijavi se</p>
              <button type="button">Registracija</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
