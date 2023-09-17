import "./header.css";
import firstCar from "../../assets/firstCar.png";
import drivingCar from "../../assets/drivingCar.gif";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import React, { useRef, useState } from "react";
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
import noAvatar from "../../assets/noAvatar.png";
import picture1 from "../../assets/TestImages/picture1.jpg";
import Blend from "../../assets/Blend.png";

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

  const fromDateRef = useRef();
  const toDateRef = useRef();
  const navigate = useNavigate();
  const { fromDate, toDate, fromPrice, toPrice } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const filterHandler = async (e) => {
    const fromDate = fromDateRef.current.value;
    const toDate = toDateRef.current.value;
    dispatch(
      setFilter({
        fromDate: fromDate,
        toDate: toDate,
      })
    );
    navigate(`/search-options`);
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
          {user.name ? (
            <div className="wd--header-sign--account">
              {user.img ? (
                <div className="wd--header-sign--account-avatar">
                  <img src={user.img} alt="" />
                </div>
              ) : (
                <RiAccountCircleFill color="#fff" size="50" />
              )}
              <RiArrowDownSLine color="#fff" size="50" />
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
        <RegistrationForm onClose={handleCloseRegistrationForm} />
      )}
      {showLoginForm && <LoginForm onClose={handleCloseLoginForm} />}
      <div className="wd--header-2">
        <div className="wd--header-content">
          <h1 className="gradient--text">
            Najpovoljnije rentiranje vozila u Srbiji
          </h1>
          <p>
            lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolor, necessitatibus illum exercitationem adipisci culpa minus fuga
            blanditiis unde eum nisi numquam iusto voluptates debitis aspernatur
            sint porro earum, ut nobis?
          </p>
          <form className="wd--header-content--input" onSubmit={filterHandler}>
            <input
              type="date"
              placeholder="Datum od:"
              id="dateFrom"
              ref={fromDateRef}
            />
            <input type="date" placeholder="Datum do:" ref={toDateRef} />
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
