import React from "react";
import { RiAccountCircleFill, RiArrowDownSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import "./profileAccountBig.css";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import OrangeButton from "../orangeButton/OrangeButton";

const ProfileAccountBig = ({ color }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  return (
    <div
      className="wd--navbar-sign--account"
      style={{ backgroundColor: color }}
    >
      {user.profileImage ? (
        <Link to="/profile">
          <div className="wd--navbar-sign--account-avatar">
            <img src={user.profileImage} alt="" />
          </div>
        </Link>
      ) : (
        <RiAccountCircleFill color="#5e5e5e" size="50" />
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
          <div className="wd--header--sign-dropdown-container">
            <div className="wd--header--sign-dropdown-container-links">
              <p>
                <Link to="/profile">Profile</Link>
              </p>
              <p>
                <Link to="add-post">Post your car</Link>
              </p>
              <p>
                <Link to="settings">Settings</Link>
              </p>
            </div>
            <OrangeButton text="Sign out" action={handleLogout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAccountBig;
