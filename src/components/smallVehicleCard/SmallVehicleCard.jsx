import React from "react";
import "./smallVehicleCard.css";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPrimary, ChipSuccess, ChipWarning, Loading } from "../";
import { GiCartwheel } from "react-icons/gi";
import { MdOutlineDriveEta } from "react-icons/md";
import { PiEngineLight, PiGasPump } from "react-icons/pi";
import { useGetPostByVehicleIdQuery } from "../../redux/postSlice";

const SmallVehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPostByVehicleIdQuery(vehicle?._id);

  const renderStatus = () => {
    if (vehicle?.documents?.length < 3) {
      return <ChipWarning label="Upload documents" />;
    }
    if (!vehicle?.isVerified) {
      return <ChipWarning label="Pending" />;
    }
    return <ChipSuccess label="Verified" />;
  };

  const disableCreatePost =
    vehicle?.documents?.length < 3 || !vehicle?.isVerified;

  const handleCreatePost = () => {
    navigate(`/add-post/${vehicle?._id}`);
  };

  const handleViewPost = () => {
    navigate(`/profile/${data?._id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div key={vehicle?._id} className="wd-profile--vehicles-vehicle">
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
        <ButtonPrimary
          disabled={disableCreatePost}
          onClick={data !== null ? handleViewPost : handleCreatePost}
          sm
        >
          {data !== null ? "View post" : "Create Post"}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SmallVehicleCard;
