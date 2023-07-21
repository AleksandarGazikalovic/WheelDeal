import React from "react";
import "./header.css";
import firstCar from "../../assets/firstCar.png";
import drivingCar from "../../assets/drivingCar.gif";

const Header = () => {
  return (
    <div className="wd__header section__padding" id="home">
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
          <button type="button">Pretraga</button>
        </div>
      </div>
      <div className="wd__header-image">
        <img src={firstCar} alt="car" />
      </div>
    </div>
  );
};

export default Header;
