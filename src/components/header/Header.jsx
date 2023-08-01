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
      <div className="wave2">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill2"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Header;
