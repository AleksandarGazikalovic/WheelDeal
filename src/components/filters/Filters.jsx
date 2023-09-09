import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./filters.css";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="how-long-filter">
        <DatePicker
          label="From"
          value={fromDate}
          onChange={(newDate) => handleDateChange({ fromDate: newDate })}
        />
        <AiOutlineMinus />
        <DatePicker
          label="To"
          value={toDate}
          onChange={(newDate) => handleDateChange({ toDate: newDate })}
        />
      </div>
    </LocalizationProvider>
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

function ModelFilter({ onChange, model }) {
  const handleChange = (newModel) => {
    onChange(newModel);
  };

  return (
    <TextField
      id="searchModel"
      type="search"
      label="Search"
      value={model}
      onChange={(e) => handleChange({ model: e.target.value })}
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

const Filters = ({ activeFilter, isSlideDown }) => {
  let filterContent;
  const dispatch = useDispatch();

  const [filterValues, setFilterValues] = useState({
    fromDate: "",
    toDate: "",
    fromPrice: "",
    toPrice: "",
    location: "",
    model: "",
  });

  const applyFilter = async () => {
    dispatch(setFilter(filterValues));
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
    case "model":
      filterContent = (
        <ModelFilter onChange={handleFilterChange} model={filterValues.model} />
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
