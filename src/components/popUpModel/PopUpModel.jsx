import React, { useState } from "react";
import "./popUpModel.css";
import { RiCloseLine } from "react-icons/ri";

function PopUpModel({ closePopup, buttons, title, textContent, checkedBox }) {
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
                If you agree with the terms and conditions, please check the box
              </label>
            </div>
          )}
        </div>
        {buttons && (
          <div className="wd-profile--popUp-footer">
            <button
              onClick={() => {
                closePopup(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button
              disabled={checkedBox && !isChecked}
              id={isChecked || checkedBox === false ? "checked" : "notChecked"}
              onClick={() => {
                closePopup(false);
              }}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopUpModel;
