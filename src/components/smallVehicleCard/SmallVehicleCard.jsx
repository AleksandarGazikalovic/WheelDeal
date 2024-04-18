import React from "react";
import "./smallVehicleCard.css";
import { Link, useNavigate } from "react-router-dom";
import { SuccessChip, WarningChip } from "../chips";
import CustomButton from "../customButton/CustomButton";
import { GiCartwheel } from "react-icons/gi";
import { MdOutlineDriveEta } from "react-icons/md";
import { PiEngineLight, PiGasPump } from "react-icons/pi";

const SmallVehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const renderStatus = () => {
    if (vehicle?.documents?.length < 3) {
      return <WarningChip label="Upload documents" />;
    }
    if (!vehicle?.isVerified) {
      return <WarningChip label="Pending" />;
    }
    return <SuccessChip label="Verified" />;
  };

  const disableCreatePost =
    vehicle?.documents?.length < 3 || !vehicle?.isVerified;

  const handleCreatePost = () => {
    console.log("Create Post");
  };

  return (
    <Link
      to={`/profile/${vehicle?._id}`}
      key={vehicle?._id}
      className="wd-profile--vehicles-vehicle"
    >
      <div className="wd-profile--vehicles-vehicle-header">
        <h4 className="wd-profile--vehicles-vehicle-header-title">
          {vehicle?.brand} {vehicle?.carModel} {vehicle?.year}
        </h4>
        {renderStatus()}
      </div>
      <div className="wd-profile--vehicles-vehicle-body">
        <div className="wd-profile--vehicles-vehicle-image">
          <img src={vehicle?.images[0]} alt="vehicle" />
        </div>
        <ul className="wd-profile--vehicles-vehicle-info">
          <li>
            <MdOutlineDriveEta size={15} />
            <span>Drive: </span> {vehicle?.drive}
          </li>
          <li>
            <GiCartwheel size={15} />
            <span>Transmission: </span> {vehicle?.transmission}
          </li>
          <li>
            <PiEngineLight size={15} />
            <span>Engine: </span> {vehicle?.engine}
          </li>
          <li>
            <PiGasPump size={15} />
            <span>Fuel: </span> {vehicle?.fuel}
          </li>
          <li>
            <PiGasPump size={15} />
            <span>Mileage: </span> {vehicle?.mileage}
          </li>
        </ul>
        <CustomButton
          text={"Create Post"}
          disabled={disableCreatePost}
          action={handleCreatePost}
        />
      </div>
    </Link>
  );
};

export default SmallVehicleCard;
