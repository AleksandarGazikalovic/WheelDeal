import { Box, Menu, MenuItem, Select, TextField } from "@mui/material";
import "../filters.css";
import carModelsArray from "../../../models/car-models.json";
import React, { useEffect, useRef, useState } from "react";

const BrandFilter = ({ onChange, brand, parent }) => {
  const handleChange = (newBrand) => {
    onChange(newBrand);
  };

  const anchorRef = useRef(null);

  // don't remove, without this function the select jumps to top left on the desktop screen when you click/drag scrollbar with mouse
  function handleClick(e) {
    if (e.clientX + 7 >= e.target.clientWidth) {
      e.stopPropagation();
      return;
    }
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      ref={anchorRef}
    >
      <TextField
        id="searchBrand"
        type="search"
        select
        sx={{ width: 300 }}
        label="Search"
        value={brand}
        onChange={(e) => handleChange({ brand: e.target.value })}
        onMouseDown={(e) => handleClick(e)}
        onClose={(e) => {
          e.preventDefault();
        }}
        menuprops={{
          anchorEl: anchorRef,
          getContentAnchorEl: () => {
            return anchorRef;
          },
        }}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <SearchIcon />
        //     </InputAdornment>
        //   ),
        // }}
      >
        <MenuItem key={""} value={""}>
          {"- Clear choice -"}
        </MenuItem>
        {carModelsArray
          .sort((a, b) => a.brand.localeCompare(b.brand))
          .map((item) => (
            <MenuItem key={item.brand} value={item.brand}>
              {item.brand}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
};

export default BrandFilter;
