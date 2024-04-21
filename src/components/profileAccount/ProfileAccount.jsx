import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./profileAccount.css";
import { ButtonPrimary, ProfileAccountSmall, ProfileAccountBig } from "../";

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
    if (user._id === undefined) {
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
          <ButtonPrimary onClick={handleShowRegistrationForm} md>
            Sign up
          </ButtonPrimary>
        </div>
      )}
    </>
  );
};

export default ProfileAccount;
