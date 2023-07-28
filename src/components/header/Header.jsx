import React from "react";
import "./header.css";
import firstCar from "../../assets/firstCar.png";
import drivingCar from "../../assets/drivingCar.gif";

const Header = (toggleSign) => {
  const onClickHandler = async () => {
    window.location.href = "/search-options";
  };

  return (
    <div className="wd__header" id="home">
      <div className="wd__header-content">
        <h1 className="gradient__text">
          Najpovoljnije rentiranje vozila u Srbiji
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
          necessitatibus illum exercitationem adipisci culpa minus fuga
          blanditiis unde eum nisi numquam iusto voluptates debitis aspernatur
          sint porro earum, ut nobis?
        </p>
        <div className="wd__header-content__input">
          <input type="search" placeholder="Cena od:" />
          <input type="search" placeholder="Cena do:" />
          <input type="date" placeholder="Datum od:" />
          <input type="date" placeholder="Datum do:" />
          <button type="button" onClick={onClickHandler}>
            Pretraga
          </button>
        </div>
      </div>
      <div className="wd__header-image">
        <img src={firstCar} alt="car" />
      </div>
      <div className="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Header;
