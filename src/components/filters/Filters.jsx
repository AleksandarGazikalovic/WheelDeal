import React, { useEffect } from "react";
import "./filters.css";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import { clearPosts, fetchPosts, resetPosts } from "../../redux/postsSlice";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

function WhereFilter({ onChange, location, defaultLocation }) {
  const handleChange = (newLocation) => {
    onChange(newLocation);
  };

  return (
    <TextField
      id="searchWhere"
      type="search"
      label="Search"
      defaultValue={defaultLocation}
      value={location}
      onChange={(e) => handleChange({ location: e.target.value })}
      sx={{ width: 300 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

function HowLongFilter({
  onChange,
  fromDate,
  toDate,
  defaultFromDate,
  defaultToDate,
}) {
  const handleDateChange = (newDates) => {
    // Call the onChange function to update the filter values
    onChange(newDates);
  };
  return (
    <div className="how-long-filter">
      <div className="how-long-from">
        <label htmlFor="how-long-from-input">From</label>
        <input
          type="date"
          id="how-long-from-input"
          defaultValue={defaultFromDate}
          value={fromDate}
          onChange={(e) => handleDateChange({ fromDate: e.target.value })}
        />
      </div>
      <AiOutlineMinus />
      <div className="how-long-to">
        <label htmlFor="how-long-to-input">To</label>
        <input
          type="date"
          id="how-long-to-input"
          defaultValue={defaultToDate}
          value={toDate}
          onChange={(e) => handleDateChange({ toDate: e.target.value })}
        />
      </div>
    </div>
  );
}

function HowMuchFilter({
  onChange,
  fromPrice,
  toPrice,
  defaultFromPrice,
  defaultToPrice,
}) {
  const handlePriceChange = (value, name) => {
    // Call the onChange function to update the filter values
    onChange({ [name]: value });
  };

  return (
    <div className="how-much-filter">
      <CurrencyInput
        className="currency-input"
        name="fromPrice"
        placeholder="Start price"
        defaultValue={defaultFromPrice}
        value={fromPrice}
        decimalsLimit={2}
        onValueChange={(value) => handlePriceChange(value, "fromPrice")}
        prefix="€"
      />
      <AiOutlineMinus />
      <CurrencyInput
        className="currency-input"
        name="toPrice"
        placeholder="End price"
        defaultValue={defaultToPrice}
        value={toPrice}
        decimalsLimit={2}
        onValueChange={(value) => handlePriceChange(value, "toPrice")}
        prefix="€"
      />
    </div>
  );
}

function BrandFilter({ onChange, brand, defaultBrand }) {
  const handleChange = (newBrand) => {
    onChange(newBrand);
  };

  return (
    <TextField
      id="searchBrand"
      type="search"
      label="Search"
      defaultValue={defaultBrand}
      value={brand}
      onChange={(e) => handleChange({ brand: e.target.value })}
      sx={{ width: 300 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

const Filters = ({
  activeFilter,
  isSlideDown,
  resetFilters,
  setResetFilters,
}) => {
  let filterContent;
  const dispatch = useDispatch();
  // const cookies = new Cookies(null, { path: "/" });
  const [filterValues, setFilterValues] = useState({
    fromDate: undefined,
    toDate: undefined,
    fromPrice: undefined,
    toPrice: undefined,
    location: undefined,
    brand: undefined,
    page: 1,
  });

  const filterState = useSelector((state) => state.filter);

  useEffect(() => {
    if (resetFilters) {
      setFilterValues({
        fromDate: undefined,
        toDate: undefined,
        fromPrice: undefined,
        toPrice: undefined,
        location: undefined,
        brand: undefined,
        page: 1,
      });
      setResetFilters(false);
    }
  }, [resetFilters, setResetFilters]);

  const applyFilter = async () => {
    // cookies.set("filter", filterValues);
    dispatch(setFilter(filterValues));
    dispatch(clearPosts());
  };

  const handleFilterChange = (newValues) => {
    setFilterValues({ ...filterValues, ...newValues });
  };

  switch (activeFilter) {
    case "where":
      filterContent = (
        <WhereFilter
          onChange={handleFilterChange}
          location={filterValues.location}
          defaultLocation={filterState.location}
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
          defaultBrand={filterState.brand}
        />
      );
      break;
    default:
      filterContent = null;
  }

  return (
    <div className={`filter-holder ${isSlideDown ? "active" : ""}`}>
      {filterContent}
      <button className="apply-filter" onClick={applyFilter}>
        Apply
      </button>
    </div>
  );
};

export default Filters;
