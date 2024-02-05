import React from "react";
import ProfileAccountBig from "../profileAccountBig/ProfileAccountBig";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./profileAccount.css";
import OrangeButton from "../orangeButton/OrangeButton";
import ProfileAccountSmall from "../profileAccountSmall/ProfileAccountSmall";

const ProfileAccount = ({
  size,
  color,
  textColor,
  handleShowLoginForm,
  handleShowRegistrationForm,
}) => {
  const user = useSelector((state) => state.user.userInfo);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user._id) {
      setLoggedIn(true);
    }
    if (user._id === undefined){
      setLoggedIn(false);
    }

  }, [user]);
  return (
    <>
      {loggedIn ? (
        size === "small" ? (
          <ProfileAccountSmall />
        ) : (
          <ProfileAccountBig textColor={textColor} color={color} />
        )
      ) : (
        <div className="wd--profile-account-link-btns">
          <button
            type="button"
            id="login"
            style={{ color: textColor }}
            onClick={handleShowLoginForm}
          >
            Log in
          </button>
          <OrangeButton text="Sign up" action={handleShowRegistrationForm} />
        </div>
      )}
    </>
  );
};

export default ProfileAccount;
