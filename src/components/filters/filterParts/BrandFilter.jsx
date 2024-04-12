import { Box, MenuItem, Select } from "@mui/material";
import "../filters.css";
import carModelsArray from "../../../models/car-models.json";

const BrandFilter = ({ onChange, brand, open, setOpen }) => {
  const handleChange = (newBrand) => {
    onChange(newBrand);
  };

  // don't remove, without this function the select jumps to top left on the desktop screen when you click/drag scrollbar with mouse
  function handleClick(e) {
    if (!open) {
      setOpen(true);
    }

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
    >
      <Select
        id="searchBrand"
        type="search"
        open={open}
        sx={{ width: 300 }}
        label="Search"
        value={brand}
        onChange={(e) => handleChange({ brand: e.target.value })}
        onMouseDown={(e) => handleClick(e)}
        onClose={(e) => {
          setOpen(false);
        }}
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
      </Select>
    </Box>
  );
};

export default BrandFilter;
