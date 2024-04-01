import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../filters.css";

const WhereFilter = ({ onChange, location }) => {
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
};

export default WhereFilter;
