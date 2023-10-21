import React from "react";
import "./tabBar.css";
import { IoStatsChartOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { AiFillCar, AiOutlineInfoCircle } from "react-icons/ai";
import { GoHome, GoPlus } from "react-icons/go";
import { FaHeart } from "react-icons/fa";

const TabBar = ({ onTabClick }) => {
  const handleClick = (buttonName) => {
    onTabClick(buttonName);
  };

  return (
    <div className="wd--tabBar">
      <div className="wd--tabBar-icons">
        <button onClick={() => handleClick("info")}>
          <AiOutlineInfoCircle size={30} />
        </button>
        <button onClick={() => handleClick("car")}>
          <AiFillCar size={30} />
        </button>
        <button onClick={() => handleClick("like")}>
          <FaHeart size={30} />
        </button>
        <button onClick={() => handleClick("stats")}>
          <IoStatsChartOutline size={30} />
        </button>
        <button onClick={() => handleClick("settings")}>
          <FiSettings size={30} />
        </button>
      </div>
    </div>
  );
};

export default TabBar;
