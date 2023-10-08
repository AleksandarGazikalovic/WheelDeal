import React from "react";
import "./topFilter.css";
import { useState, useRef, useEffect } from "react";
import { Filters } from "..";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setPosts } from "../../redux/postsSlice";
import { setFilter } from "../../redux/filterSlice";

const TopFilter = ({ posts }) => {
  const [activeFilter, setActiveFilter] = useState(""); // Initial form value
  const [isSlideDown, setIsSlideDown] = useState(false);
  const [resetFilters, setResetFilters] = useState(false); // Initial form value
  const topFilterRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fromDate, toDate, fromPrice, toPrice, location, model } = useSelector(
    (state) => state.filter
  );

  const resetFilter = async () => {
    const filterValues = {
      fromDate: "",
      toDate: "",
      fromPrice: "",
      toPrice: "",
      location: "",
      model: "",
    };

    dispatch(setFilter(filterValues));

    const res = await axios.get(
      `posts/filter/all?startDate=${fromDate}&endDate=${toDate}&startPrice=${fromPrice}&endPrice=${toPrice}&location=${location}&model=${model}`
    );
    dispatch(setPosts(res.data));
    setResetFilters(true);
  };

  const handleFilterChange = (formName) => {
    setActiveFilter(formName);
    setIsSlideDown(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // if (
      //   topFilterRef.current &&
      //   !topFilterRef.current.contains(event.target)
      // ) {
      //   setIsSlideDown(false);
      // }
    }

    // Add a click event listener to the entire document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="wd--search--top-filter">
      <div ref={topFilterRef} className="wd--search--top-filter-wrapper">
        <div className="wd--search--top-filter-btns">
          <button
            className="where-btn"
            onClick={() => handleFilterChange("where")}
          >
            Where
          </button>
          <button
            className="how-much-btn"
            onClick={() => handleFilterChange("howmuch")}
          >
            How much
          </button>
          <button
            className="how-long-btn"
            onClick={() => handleFilterChange("howlong")}
          >
            How long
          </button>
          <button
            className="model-btn"
            onClick={() => handleFilterChange("model")}
          >
            Model
          </button>
          <button className="rent-btn" onClick={resetFilter}>
            Reset filters
          </button>
        </div>
        {
          activeFilter ? (
            <Filters
              activeFilter={activeFilter}
              isSlideDown={isSlideDown}
              resetFilters={resetFilters}
              setResetFilters={setResetFilters}
            />
          ) : null // If the activeFilter is empty, don't render the form
        }
      </div>
    </div>
  );
};

export default TopFilter;
