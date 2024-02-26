import React, { useState } from "react";
import "./popUpModel.css";
import { RiCloseLine } from "react-icons/ri";

function PopUpModel({ closePopup, accepted, title, textContent, checkedBox }) {
  const [isChecked, setIsChecked] = useState(false);

  const changeChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="wd-profile--popUp-background">
      <div className="wd-profile--popUp-container">
        <div className="wd-profile--popUp--div-top">
          <RiCloseLine
            className="wd-profile--popUp--close"
            size={40}
            onClick={() => {
              closePopup(false);
              accepted(false);
            }}
          />
        </div>
        <div className="wd-profile--popUp-title">
          <h1>{title}</h1>
        </div>
        <div className="wd-profile--popUp-body">
          <div className="wd-profile--popUp-body--text">
            <p>{textContent}</p>
          </div>
          {checkedBox && (
            <div className="wd-profile--popUp-body--checkBox">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={changeChecked}
                id="check"
              ></input>
              <label for="check">
                Ukoliko se slazete sa svim pravilima i obavezama, molim Vas
                cekirajte da biste nastavili.
              </label>
            </div>
          )}
        </div>
        <div className="wd-profile--popUp-footer">
          <button
            onClick={() => {
              closePopup(false);
              accepted(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            id={isChecked || checkedBox == false ? "checked" : "notChecked"}
            onClick={() => {
              {
                if (checkedBox == false || isChecked) {
                  closePopup(false);
                  accepted(true);
                } else {
                  closePopup(true);
                  accepted(false);
                }
              }
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpModel;
