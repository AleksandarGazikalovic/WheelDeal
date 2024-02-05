import "./header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import React, { useEffect, useRef, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import logo from "../../assets/logoLight.png";
import RegistrationForm from "../registrationForm/RegistrationForm";
import LoginForm from "../loginForm/LoginForm";
import { Link } from "react-router-dom";
import { AiOutlineMinus } from "react-icons/ai";
import Cookies from "universal-cookie";
import Menu from "../menu/Menu";
import ProfileAccount from "../profileAccount/ProfileAccount";
import { clearPosts } from "../../redux/postsSlice";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (user._id) {
      setLoggedIn(true);
    }
    if (user._id === undefined) {
      setLoggedIn(false);
    }
  }, [user._id]);

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
      fromPrice: undefined,
      toPrice: undefined,
      location: undefined,
      brand: undefined,
      page: 1,
    };
    if (filterValues.fromDate !== "" || filterValues.toDate !== "") {
      cookies.set("filter", filterValues);
    } else {
      cookies.remove("filter");
    }
    dispatch(setFilter(filterValues));
    dispatch(clearPosts());
    navigate(`/search-options`);
  };

  return (
    <header className="wd--header" id="home">
      <div className="wd--header-1 ">
        <div className="wd--header-links-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="wd--header-sign">
          <ProfileAccount
            size={"big"}
            handleShowLoginForm={handleShowLoginForm}
            handleShowRegistrationForm={handleShowRegistrationForm}
          />
        </div>

        <div className="wd--header-menu">
          <RiMenu3Line
            color="#fff"
            size="35"
            onClick={() => {
              setToggleMenu(true);
            }}
          />
          <Menu
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
            handleShowLoginForm={handleShowLoginForm}
            handleShowRegistrationForm={handleShowRegistrationForm}
            loggedIn={loggedIn}
          />
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
            <div className="wd--header-content--div">
              <label className="wd--header-content--label" htmlFor="dateFrom">
                From
              </label>
              <input
                type="date"
                id="dateFrom"
                placeholder="From"
                ref={fromDateRef}
              />
            </div>
            <AiOutlineMinus className="minus" />
            <div className="wd--header-content--div">
              <label className="wd--header-content--label" htmlFor="dateTo">
                To
              </label>
              <input type="date" ref={toDateRef} placeholder="To" id="dateTo" />
            </div>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="wave2">
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
      </div>
    </header>
  );
};

export default Header;
