import React from "react";
import "./topFilter.css";
import { useState, useRef, useEffect } from "react";
import { CurrencyConverter, Filters } from "..";
import { useDispatch } from "react-redux";
import { clearPosts } from "../../redux/postsSlice";
import { clearFilter } from "../../redux/filterSlice";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import Cookies from "universal-cookie";

const TopFilter = () => {
  const [activeFilter, setActiveFilter] = useState(""); // Initial form value
  const [isSlideDown, setIsSlideDown] = useState(false);
  const [canResetFilters, setCanResetFilters] = useState(false); // Initial form value
  const topFilterRef = useRef(null);
  const dispatch = useDispatch();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);
  // const cookies = new Cookies(null, { path: "/" });

  const resetFilter = async () => {
    // if (cookies.get("filter") !== undefined) {
    //   cookies.remove("filter");
    //   dispatch(clearPosts());
    //   dispatch(clearFilter());
    //   setCanResetFilters(true);
    // }
    if (canResetFilters /* && filterChanged*/) {
      console.log(canResetFilters);
      console.log(filterChanged);
      dispatch(clearPosts());
      dispatch(clearFilter());
      setCanResetFilters(false);
      setIsSlideDown(false);
    }
  };

  const handleFilterChange = (filterName) => {
    setActiveFilter(filterName);
    setIsSlideDown(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        topFilterRef.current &&
        !topFilterRef.current.contains(event.target)
      ) {
        setIsSlideDown(false);
      }
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
      <CurrencyConverter />
      <div ref={topFilterRef} className="wd--search--top-filter-wrapper">
        <div className="wd--search--top-filter-dropdown">
          <button
            className="wd--search--top-filter-dropdown-btn"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          >
            Filters
            {toggleDropdown ? (
              <RiArrowUpSLine size={30} />
            ) : (
              <RiArrowDownSLine size={30} />
            )}
          </button>
          {toggleDropdown ? (
            <div className="wd--search--top-filter-dropdown-content">
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
                className="brand-btn"
                onClick={() => handleFilterChange("brand")}
              >
                Brand
              </button>
              <button
                className="reset-btn"
                onClick={resetFilter}
                disabled={!canResetFilters}
                title={
                  canResetFilters
                    ? "Reset previously applied filters"
                    : "There are no applied filters"
                }
              >
                Reset filters
              </button>
            </div>
          ) : null}
        </div>
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
            className="brand-btn"
            onClick={() => handleFilterChange("brand")}
          >
            Brand
          </button>
          <button
            className="reset-btn"
            onClick={resetFilter}
            disabled={!canResetFilters}
            title={
              canResetFilters
                ? "Reset previously applied filters"
                : "There are no applied filters"
            }
          >
            Reset filters
          </button>
        </div>
        {
          activeFilter ? (
            <Filters
              activeFilter={activeFilter}
              isSlideDown={isSlideDown}
              canResetFilters={canResetFilters}
              setCanResetFilters={setCanResetFilters}
              filterChanged={filterChanged}
              setFilterChanged={setFilterChanged}
            />
          ) : null // If the activeFilter is empty, don't render the form
        }
      </div>
    </div>
  );
};

export default TopFilter;
