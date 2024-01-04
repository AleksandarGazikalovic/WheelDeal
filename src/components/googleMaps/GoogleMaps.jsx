import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./googleMaps.css";

const GoogleMaps = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const center = {
    lat: -34.397,
    lng: 150.644,
  };

  return (
    <div className="wd--google-maps-wrapper">
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMaps;
