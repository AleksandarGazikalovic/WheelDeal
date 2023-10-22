import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noAvatar.png";
import "./profileAccountSmall.css";

const ProfileAccountSmall = () => {
  const user = useSelector((state) => state.user.userInfo);
  return (
    <Link to="/profile">
      <div className="wd--small-profile-account">
        <img src={user.profileImage || noAvatar} alt="profile" />
      </div>
    </Link>
  );
};

export default ProfileAccountSmall;
