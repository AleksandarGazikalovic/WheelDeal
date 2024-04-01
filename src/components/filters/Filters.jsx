import React, { useEffect } from "react";
import "./filters.css";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { clearFilter, setFilter } from "../../redux/filterSlice";
import { clearPosts, fetchPosts, resetPosts } from "../../redux/postsSlice";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { Box, MenuItem } from "@mui/material";

import WhereFilter from "./filterParts/WhereFilter";
import HowLongFilter from "./filterParts/HowLongFilter";
import HowMuchFilter from "./filterParts/HowMuchFilter";
import BrandFilter from "./filterParts/BrandFilter";
import Loading from "../loading/Loading";

const Filters = ({
  activeFilter,
  setActiveFilter,
  isSlideDown,
  setIsSlideDown,
  canResetFilters,
  setCanResetFilters,
  filterChanged,
  setFilterChanged,
  isFilterReset,
  open,
  setOpen,
}) => {
  let filterContent;
  const dispatch = useDispatch();
  // const cookies = new Cookies(null, { path: "/" });
  const filterState = useSelector((state) => state.filter);
  const [filterValues, setFilterValues] = useState({
    fromDate: filterState.fromDate,
    toDate: filterState.toDate,
    fromPrice: filterState.fromPrice,
    toPrice: filterState.toPrice,
    location: filterState.location,
    brand: filterState.brand,
    page: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilterValues({
      fromDate: filterState.fromDate,
      toDate: filterState.toDate,
      fromPrice: filterState.fromPrice,
      toPrice: filterState.toPrice,
      location: filterState.location,
      brand: filterState.brand,
      page: 1,
    });
  }, [isFilterReset]);

  useEffect(() => {
    // compare current filter values to filterState values on each change
    if (
      filterValues.brand === filterState.brand &&
      filterValues.fromDate === filterState.fromDate &&
      filterValues.toDate === filterState.toDate &&
      filterValues.fromPrice === filterState.fromPrice &&
      filterValues.toPrice === filterState.toPrice &&
      filterValues.location === filterState.location
    ) {
      setFilterChanged(false);
    }
  }, [filterValues]);

  useEffect(() => {
    if (loading) {
      // reset loading to false (timeout is used to simulate API call if filters are the same)
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [loading]);

  const applyFilter = async () => {
    // cookies.set("filter", filterValues);

    if (!filterChanged) {
      // if filters haven't changed since last time, just pretend to make API call by rendering loading animation
      setLoading(true);
      setIsSlideDown(false);
      return;
    }

    dispatch(setFilter(filterValues));
    dispatch(clearPosts());

    if (
      filterValues.brand === "" &&
      filterValues.fromDate === "" &&
      filterValues.toDate === "" &&
      filterValues.fromPrice === "" &&
      filterValues.toPrice === "" &&
      filterValues.location === ""
    ) {
      setCanResetFilters(false);
    } else {
      setCanResetFilters(true);
    }

    setFilterChanged(false);
    setIsSlideDown(false);
    setActiveFilter("");
  };

  const handleFilterChange = (newValues) => {
    setFilterValues({ ...filterValues, ...newValues });

    // collect all current filters to currFilter object
    let currFilter = {};
    for (let key in filterValues) {
      currFilter[key] = "";
      if (filterValues[key] !== "" && key.toString() != "page") {
        currFilter[key] = filterValues[key];
      }
      if (newValues.hasOwnProperty(key)) {
        currFilter[key] = newValues[key];
      }
    }

    // console.log(filterState);
    // console.log(currFilter);

    // if current filter is different than filterState
    // (in other words, if current filter in this component differs from previously applied filter),
    // then after you click "Apply" the API call will be performed and new filter will be applied.
    if (
      filterState.brand === currFilter.brand &&
      filterState.fromDate === currFilter.fromDate &&
      filterState.toDate === currFilter.toDate &&
      filterState.fromPrice === currFilter.fromPrice &&
      filterState.toPrice === currFilter.toPrice &&
      filterState.location === currFilter.location
    ) {
      setFilterChanged(false);
    } else {
      setFilterChanged(true);
    }
  };

  switch (activeFilter) {
    case "where":
      filterContent = (
        <WhereFilter
          onChange={handleFilterChange}
          location={filterValues.location}
        />
      );
      break;
    case "howmuch":
      filterContent = (
        <HowMuchFilter
          onChange={handleFilterChange}
          fromPrice={filterValues.fromPrice}
          toPrice={filterValues.toPrice}
          defaultFromPrice={filterState.fromPrice}
          defaultToPrice={filterState.toPrice}
        />
      );
      break;
    case "howlong":
      filterContent = (
        <HowLongFilter
          onChange={handleFilterChange}
          fromDate={filterValues.fromDate}
          toDate={filterValues.toDate}
          defaultFromDate={filterState.fromDate}
          defaultToDate={filterState.toDate}
        />
      );
      break;
    case "brand":
      filterContent = (
        <BrandFilter
          onChange={handleFilterChange}
          brand={filterValues.brand}
          open={open}
          setOpen={setOpen}
        />
      );
      break;
    default:
      filterContent = null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`filter-holder ${isSlideDown ? "active" : ""}`}>
      {filterContent}
      <button
        className="apply-filter"
        onClick={applyFilter}
        title="Apply filter"
      >
        Apply
      </button>
    </div>
  );
};

export default Filters;
