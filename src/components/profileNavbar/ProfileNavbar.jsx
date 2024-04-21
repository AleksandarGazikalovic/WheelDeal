import React, { useState } from "react";
import "./profileNavbar.css";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import noAvatar from "../../assets/noAvatar.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { logoutUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProfileNotification, ButtonPrimary, ProfileAccount } from "../";

const ProfileNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const [showInbox, setShowInbox] = useState(false);

  useEffect(() => {}, [user]);

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
    <div className="wd-profile--navbar">
      <div className="wd-profile--navbar-search">
        <IoSearchOutline size={20} />
        <input type="text" placeholder="Search" />
      </div>
      <div className="wd-profile--navbar-right">
        <ButtonPrimary onClick={handleLogout} md>
          Sign out
        </ButtonPrimary>
        <div className="wd-profile--navbar-notifications">
          <IoNotificationsOutline
            size={25}
            onClick={() => setShowInbox(!showInbox)}
          />
        </div>
        <ProfileAccount size={"small"} />
        {showInbox && (
          <div className="wd-profile--navbar--message-inbox">
            <ProfileNotification />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNavbar;
