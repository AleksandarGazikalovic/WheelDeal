import React from "react";
import "./profileNavbar.css";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noAvatar.png";
import ProfileAccount from "../profileAccount/ProfileAccount";
import OrangeButton from "../orangeButton/OrangeButton";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const ProfileNavbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  return (
    <div className="wd-profile--navbar">
      <div className="wd-profile--navbar-search">
        <IoSearchOutline size={20} />
        <input type="text" placeholder="Search" />
      </div>
      <div className="wd-profile--navbar-right">
        <OrangeButton text="Sign out" action={handleLogout} />
        <div className="wd-profile--navbar-notifications">
          <IoNotificationsOutline size={25} />
        </div>
        <ProfileAccount size={"small"} />
      </div>
    </div>
  );
};

export default ProfileNavbar;
