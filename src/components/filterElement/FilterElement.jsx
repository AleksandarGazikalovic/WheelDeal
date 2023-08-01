import React from "react";
import "./filterElement.css";

const FilterElement = (index, image) => {
  return (
    <div key={index} className="wd--search-content--elements-element">
      <div className="wd--search-content--elements-element-image">
        <img src={image.message} alt={index} />
      </div>
      <div className="wd--search-content--elements-element-text">
        <h3>{image.message.split("/")[4]}</h3>
      </div>
    </div>
  );
};

export default FilterElement;
