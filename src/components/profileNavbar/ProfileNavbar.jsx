import React from "react";
import "./profileNavbar.css";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noAvatar.png";

const ProfileNavbar = () => {
  const user = useSelector((state) => state.user.userInfo);
  return (
    <div className="wd-profile--navbar">
      <div className="wd-profile--navbar-search">
        <IoSearchOutline size={20} />
        <input type="text" placeholder="Search" />
      </div>
      <div className="wd-profile--navbar-right">
        <div className="wd-profile--navbar-notifications">
          <IoNotificationsOutline size={25} />
        </div>
        <Link to="/profile">
          <div className="wd-profile--navbar-profile">
            <img src={user.profileImage || noAvatar} alt="profile" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileNavbar;
