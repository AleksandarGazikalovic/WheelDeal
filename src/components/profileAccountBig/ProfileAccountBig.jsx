import React, { useEffect } from "react";
import { RiAccountCircleFill, RiArrowDownSLine } from "react-icons/ri";
import "./profileAccountBig.css";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import OrangeButton from "../orangeButton/OrangeButton";
import { logoutUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileAccountBig = ({ color }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

  }, [user])
  

  const handleLogout = () => {
    
     // Check if any of the fields is empty
     dispatch(logout());
     dispatch(
      logoutUser({})
      ).then((result) => {
        if (logoutUser.fulfilled.match(result)) {
          // dispatch(logout());
          navigate("/") // Successful logout
        } else {
          console.log(result.payload);
        }
    });
    //window.location.reload();
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
