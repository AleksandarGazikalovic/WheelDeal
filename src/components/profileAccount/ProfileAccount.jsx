import React from "react";
import { RiAccountCircleFill, RiArrowDownSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import "./profileAccount.css";

const ProfileAccount = () => {
  const user = useSelector((state) => state.user.userInfo);
  return (
    <div className="wd--navbar-sign--account">
      {user.profileImage ? (
        <div className="wd--navbar-sign--account-avatar">
          <img src={user.profileImage} alt="" />
        </div>
      ) : (
        <RiAccountCircleFill color="#5e5e5e" size="50" />
      )}
      <RiArrowDownSLine color="5e5e5e" size="50" />
    </div>
  );
};

export default ProfileAccount;
