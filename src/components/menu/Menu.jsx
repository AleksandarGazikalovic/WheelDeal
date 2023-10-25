import React from "react";
import "./menu.css";
import ProfileAccount from "../profileAccount/ProfileAccount";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logoDark.png";
import { useRef, useEffect } from "react";
import OrangeButton from "../orangeButton/OrangeButton";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Menu = ({
  toggleMenu,
  setToggleMenu,
  handleShowLoginForm,
  handleShowRegistrationForm,
  loggedIn,
}) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        menuRef.current.classList.remove("slide-left");
        menuRef.current.classList.add("slide-right");
        setToggleMenu(false);
      }
    };

    // Add a click event listener to the entire document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      {toggleMenu && (
        <div className="wd--menu-wrapper">
          <div className="wd--menu slide-left" ref={menuRef}>
            <div className="wd--menu-links">
              <ProfileAccount
                size={"small"}
                textColor={"#000"}
                handleShowLoginForm={handleShowLoginForm}
                handleShowRegistrationForm={handleShowRegistrationForm}
              />
              <div className="wd--menu-links-container">
                <div className="wd--menu-links-container-item">
                  <Link to="/">
                    <p>Home</p>
                  </Link>
                </div>
                <div className="wd--menu-links-container-item">
                  <Link to="/search-options">
                    <p>Cars</p>
                  </Link>
                </div>
                <div className="wd--menu-links-container-item">
                  {loggedIn ? (
                    <Link to="/add-post">
                      <p>Add your car</p>
                    </Link>
                  ) : (
                    <p onClick={handleShowLoginForm}>Add your car</p>
                  )}
                </div>
                <div className="wd--menu-links-container-item">
                  <p>Calculator</p>
                </div>
                {loggedIn && (
                  <div className="wd--menu-links-container-item">
                    <OrangeButton text="Sign out" action={handleLogout} />
                  </div>
                )}
              </div>
              <div className="wd--menu-links-logo">
                <img src={Logo} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
