import "./header.css";
import firstCar from "../../assets/firstCar.png";
import drivingCar from "../../assets/drivingCar.gif";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import React, { useRef, useState, useEffect } from "react";
import {
  RiMenu3Line,
  RiCloseLine,
  RiAccountCircleFill,
  RiArrowDownSLine,
} from "react-icons/ri";
import logo from "../../assets/Logo2.png";
import RegistrationForm from "../registrationForm/RegistrationForm";
import LoginForm from "../loginForm/LoginForm";
import { Link } from "react-router-dom";
import { AiOutlineMinus } from "react-icons/ai";
import { fetchPosts } from "../../redux/postsSlice";
import { logout } from "../../redux/userSlice";
import Cookies from "universal-cookie";

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

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.user.userInfo);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const dispatch = useDispatch();

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

  const cookies = new Cookies(null, { path: "/" });
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const navigate = useNavigate();

  const filterHandler = async (e) => {
    const filterValues = {
      fromDate: fromDateRef.current.value,
      toDate: toDateRef.current.value,
      fromPrice: "",
      toPrice: "",
      location: "",
      model: "",
    };
    console.log(filterValues);
    cookies.set("filter", filterValues);
    dispatch(
      setFilter({
        filterValues,
      })
    );
    dispatch(
      fetchPosts({
        filterValues,
      })
    );
    navigate(`/search-options`);
  };

  useEffect(() => {
    if (user.id !== "") {
      setLoggedIn(true);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <header className="wd--header" id="home">
      <div className="wd--header-1 ">
        <div className="wd--header-links">
          <div className="wd--header-links-logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="wd--header-links-container">
            <Menu />
          </div>
        </div>
        <div className="wd--header-sign">
          {loggedIn ? (
            <div className="wd--header-sign--account">
              {user.profileImage ? (
                <div className="wd--header-sign--account-avatar">
                  <img src={user.profileImage} alt="" />
                </div>
              ) : (
                <RiAccountCircleFill color="#fff" size="50" />
              )}
              <div className="wd--header--sign-dropdown">
                {toggleDropdown ? (
                  <RiCloseLine
                    color="#003049"
                    size="45"
                    onClick={() => setToggleDropdown(false)}
                  />
                ) : (
                  <RiArrowDownSLine
                    color="#003049"
                    size="45"
                    onClick={() => setToggleDropdown(true)}
                  />
                )}
                {toggleDropdown && (
                  <div className="wd--header--sign-dropdown-container slide-buttom">
                    <div className="wd--header--sign-dropdown-container-links">
                      <p>
                        <Link to="/profile">Profile</Link>
                      </p>
                      <p>
                        <a href="posts">Posts</a>
                      </p>
                      <p>
                        <a href="settings">Settings</a>
                      </p>
                      <button
                        className="wd--header--sign-dropdown-container-button"
                        type="button"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <button type="button" id="login" onClick={handleShowLoginForm}>
                Log in
              </button>
              <button
                type="button"
                id="register"
                onClick={handleShowRegistrationForm}
              >
                Sign up
              </button>
            </div>
          )}
        </div>

        <div className="wd--header-menu">
          {toggleMenu ? (
            <RiCloseLine
              color="#fff"
              size="40"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#fff"
              size="40"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="wd--header-menu-container slide-fwd-center">
              <div className="wd--header-menu-container-links">
                <Menu />
              </div>
              <div className="wd--header-menu-container-links-sign">
                <button type="button" id="login" onClick={handleShowLoginForm}>
                  Log in
                </button>
                <button
                  type="button"
                  id="register"
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
      <div className="wd--header-2">
        <div className="wd--header-content">
          <h1 className="gradient--text">Cheapest car rental in Serbia</h1>
          <p>
            Discover seamless car sharing and rentals with WheelDeal, connecting
            you to a wide range of vehicles and a trusted community of owners
            for all your transportation needs.
          </p>
          <form className="wd--header-content--input" onSubmit={filterHandler}>
            <input type="date" id="dateFrom" ref={fromDateRef} />
            <AiOutlineMinus className="minus" />
            <input type="date" ref={toDateRef} id="dateTo" />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      {/* <div className="wave2">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill2"
          ></path>
        </svg>
      </div> */}
    </header>
  );
};

export default Header;
