import React from "react";
import "./profileInfo.css";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noAvatar.png";
import { IoLogoTwitter, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io5";
import { Avatar } from "@mui/material";

const ProfileInfo = ({ setShowProfileInfoEdit }) => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="wd-profile--profile-info-wrapper">
      <FiEdit2
        size={20}
        className="wd-profile--profile-info-editBtn"
        onClick={() => setShowProfileInfoEdit(true)}
      />
      <div className="wd-profile--profile-info">
        <div className="wd-profile--profile-info--top">
          <div className="wd-profile--profile-info--image">
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
          <p className="wd-profile--profile-info--name">
            {user.name} {user.surname}
          </p>
        </div>
        <div className="wd-profile--profile-info--details">
          <div className="wd-profile--profile-info--details-labels">
            <p>Age:</p>
            <p>Phone:</p>
            <p>Email:</p>
          </div>
          <div className="wd-profile--profile-info--details-values">
            <p className="wd-profile--profile-info--details-age">
              {user.age ? user.age : "/"}
            </p>
            <p className="wd-profile--profile-info--details-phone">
              {user.phone ? user.phone : "/"}
            </p>
            <p className="wd-profile--profile-info--details-email">
              {user.email ? user.email : "/"}
            </p>
          </div>
        </div>
        <div className="wd-profile--profile-info--bottom">
          <div className="wd-profile--profile-info--details-socials">
            <IoLogoTwitter size={30} />
            <IoLogoFacebook size={30} />
            <IoLogoLinkedin size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
