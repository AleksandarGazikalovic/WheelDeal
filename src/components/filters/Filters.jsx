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
import { fetchPosts } from "../../redux/postsSlice";
import Cookies from "universal-cookie";

function WhereFilter({ onChange, location }) {
  const handleChange = (newLocation) => {
    onChange(newLocation);
  };

  return (
    <TextField
      id="searchWhere"
      type="search"
      label="Search"
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

function HowLongFilter({ onChange, fromDate, toDate }) {
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
          value={toDate}
          onChange={(e) => handleDateChange({ toDate: e.target.value })}
        />
      </div>
    </div>
  );
}

function HowMuchFilter({ onChange, fromPrice, toPrice }) {
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
        value={toPrice}
        decimalsLimit={2}
        onValueChange={(value) => handlePriceChange(value, "toPrice")}
        prefix="€"
      />
    </div>
  );
}

function BrandFilter({ onChange, brand }) {
  const handleChange = (newBrand) => {
    onChange(newBrand);
  };

  return (
    <TextField
      id="searchBrand"
      type="search"
      label="Search"
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
  const cookies = new Cookies(null, { path: "/" });
  const [filterValues, setFilterValues] = useState({
    fromDate: "",
    toDate: "",
    fromPrice: "",
    toPrice: "",
    location: "",
    brand: "",
  });

  useEffect(() => {
    if (resetFilters) {
      setFilterValues({
        fromDate: "",
        toDate: "",
        fromPrice: "",
        toPrice: "",
        location: "",
        brand: "",
      });
      setResetFilters(false);
    }
  }, [resetFilters]);

  const applyFilter = async () => {
    cookies.set("filter", filterValues);
    dispatch(setFilter(filterValues));
    dispatch(fetchPosts(filterValues));
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
        />
      );
      break;
    case "howmuch":
      filterContent = (
        <HowMuchFilter
          onChange={handleFilterChange}
          fromPrice={filterValues.fromPrice}
          toPrice={filterValues.toPrice}
        />
      );
      break;
    case "howlong":
      filterContent = (
        <HowLongFilter
          onChange={handleFilterChange}
          fromDate={filterValues.fromDate}
          toDate={filterValues.toDate}
        />
      );
      break;
    case "brand":
      filterContent = (
        <BrandFilter onChange={handleFilterChange} brand={filterValues.brand} />
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
