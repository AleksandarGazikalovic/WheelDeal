import React from "react";
import { Link } from "react-router-dom";
import { AiFillCar } from "react-icons/ai";
import { GoPlus, GoHome } from "react-icons/go";
import { IoStatsChartOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import Logo from "../../assets/logoDark.png";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="wd-profile--sidebar">
      <div className="wd-profile--sidebar-logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="wd-profile--sidebar-icons">
        <Link to="/">
          <GoHome size={30} />
        </Link>
        <Link to="/search-options">
          <AiFillCar size={30} />
        </Link>
        <Link to="/add-vehicle">
          <GoPlus size={30} />
        </Link>
        <IoStatsChartOutline size={30} />
      </div>
      <div className="wd-profile--sidebar-settings">
        <FiSettings size={30} />
      </div>
    </div>
  );
};

export default Sidebar;
