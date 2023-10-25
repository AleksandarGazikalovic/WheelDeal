import React from "react";
import "./tabBar.css";
import { IoStatsChartOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { AiFillCar, AiOutlineInfoCircle } from "react-icons/ai";
import { GoHome, GoPlus } from "react-icons/go";
import { FaHeart } from "react-icons/fa";

const TabBar = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = React.useState("info");
  const handleClick = (buttonName) => {
    onTabClick(buttonName);
    setActiveTab(buttonName);
  };

  return (
    <div className="wd--tabBar">
      <div className="wd--tabBar-icons">
        <button
          name="info"
          onClick={() => handleClick("info")}
          className={activeTab === "info" ? "active" : ""}
        >
          <AiOutlineInfoCircle size={30} />
          <p>Info</p>
        </button>
        <button
          name="car"
          onClick={() => handleClick("car")}
          className={activeTab === "car" ? "active" : ""}
        >
          <AiFillCar size={30} />
          <p>Your</p>
        </button>
        <button
          name="like"
          onClick={() => handleClick("like")}
          className={activeTab === "like" ? "active" : ""}
        >
          <FaHeart size={30} />
          <p>Wishlists</p>
        </button>
        <button
          name="stats"
          onClick={() => handleClick("stats")}
          className={activeTab === "stats" ? "active" : ""}
        >
          <IoStatsChartOutline size={30} />
          <p>Statistics</p>
        </button>
        <button
          name="settings"
          onClick={() => handleClick("settings")}
          className={activeTab === "settings" ? "active" : ""}
        >
          <FiSettings size={30} />
          <p>Settings</p>
        </button>
      </div>
    </div>
  );
};

export default TabBar;
