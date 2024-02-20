import React from "react";
import "./menu.css";
import ProfileAccount from "../profileAccount/ProfileAccount";
import { Link } from "react-router-dom";
import Logo from "../../assets/logoDark.png";
import { useRef, useEffect } from "react";
import CustomButton from "../customButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { logoutUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Menu = ({
  toggleMenu,
  setToggleMenu,
  handleShowLoginForm,
  handleShowRegistrationForm,
  loggedIn,
}) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

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
  }, [user]);

  const handleLogout = () => {
    // Check if any of the fields is empty
    dispatch(logout());
    dispatch(logoutUser({})).then((result) => {
      if (logoutUser.fulfilled.match(result)) {
        // dispatch(logout());
        navigate("/"); // Successful logout
      } else {
        console.log(result.payload.message);
      }
    });
    //window.location.reload();
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
                    <CustomButton text="Sign out" action={handleLogout} />
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
