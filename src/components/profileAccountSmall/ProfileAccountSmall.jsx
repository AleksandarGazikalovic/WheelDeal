import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./profileAccountSmall.css";
import { Avatar } from "@mui/material";

const ProfileAccountSmall = () => {
  const user = useSelector((state) => state.user.userInfo);
  return (
    <Link to="/profile">
      <div className="wd--small-profile-account">
        <Avatar
          sx={{
            width: "inherit",
            height: "inherit",
            backgroundColor: user.profileImage ? "" : "#003049",
          }}
          src={user.profileImage}
          alt={user.firstname + " " + user.lastname}
        />
      </div>
    </Link>
  );
};

export default ProfileAccountSmall;
