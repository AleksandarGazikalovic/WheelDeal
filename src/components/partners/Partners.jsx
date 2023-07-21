import "./partners.css";
import React from "react";
import FON from "../../assets/Partners/FON.png";
import drivingCar from "../../assets/drivingCar.gif";

const Partners = () => {
  return (
    <div className="wd__partners section__padding" id="partners">
      <h2>Naši partneri</h2>
      <div className="wd__partners-content">
        <div className="wd__partners-content__item">
          <img src={FON} alt="FON" />
        </div>
        <div className="wd__partners-content__item">
          <img src={FON} alt="FON" />
        </div>
        <div className="wd__partners-content__item">
          <img src={FON} alt="FON" />
        </div>
        <div className="wd__partners-content__item">
          <img src={FON} alt="FON" />
        </div>
        <div className="wd__partners-content__item">
          <img src={drivingCar} alt="drivingCar" />
        </div>
      </div>
    </div>
  );
};

export default Partners;
