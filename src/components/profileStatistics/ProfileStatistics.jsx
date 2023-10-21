import React from "react";
import "./profileStatistics.css";

const ProfileStatistics = () => {
  return (
    <div className="wd-profile--statistics-wrapper">
      <div className="wd-profile--calculations">
        <p className="wd-profile--calculations-title">Calculator</p>
        <p className="wd-profile--calculations-body">
          Want to know how much you could earn with WheelDeal? Choose your
          budget to see which cars have the highest potential return on
          investment (ROI).
        </p>
        <div className="wd-profile--calculations-link">
          <div className="wd-profile--calculations-budget">
            <input placeholder="Budget" required type="number" />
            <span className="wd-profile--calculations-border"></span>
          </div>
          <button className="wd-profile--calculations-button">Calculate</button>
        </div>
      </div>
      <div className="wd-profile--statistics">
        <p className="wd-profile--statistics-title">Statistics</p>
        <p className="wd-profile--statistics-comingsoon">Coming soon</p>
      </div>
    </div>
  );
};

export default ProfileStatistics;
