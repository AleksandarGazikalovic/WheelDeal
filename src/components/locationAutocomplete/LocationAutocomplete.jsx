import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./locationAutocomplete.css";
import { IoSearch } from "react-icons/io5";

const LocationAutocomplete = ({ selectedLocation, onSelect, disabled }) => {
  const [address, setAddress] = useState("");

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);

      if (results.length === 0) {
        return;
      }
      setAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      onSelect({ address: selectedAddress, latLng });
    } catch (error) {}
  };

  const searchOptions = {
    componentRestrictions: { country: "RS" }, // ISO 3166-1 alpha-2 code for Serbia
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div
          className="location-container"
          style={{
            pointerEvents: disabled ? "none" : "auto",
          }}
        >
          <div className="location-input-wrapper">
            <input
              {...getInputProps({
                placeholder: selectedLocation || "Search Location...",
                className: "location-search-input",
              })}
            />
            <IoSearch className="location-search-icon" />
          </div>
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            <div>
              {suggestions.map((suggestion) => {
                return (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationAutocomplete;
