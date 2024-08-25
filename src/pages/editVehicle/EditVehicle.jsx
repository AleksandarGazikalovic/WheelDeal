import React, { useEffect, useState } from "react";
import "./editVehicle.css";
import {
  Loading,
  ProfileNavbar,
  Sidebar,
  LocationAutocomplete,
  GoogleMaps,
  Navbar,
  ButtonDanger,
  ButtonPrimary,
  ButtonSuccess,
} from "../../components";
import { API_ENDPOINT } from "..";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import carModelsArray from "../../models/car-models.json";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { DateRange } from "react-date-range";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../../redux/postSlice";
import {
  setDeletedPost,
  setDeletedVehicle,
} from "../../redux/notificationsSlice";
import { deleteVehicle, updateVehicle } from "../../redux/vehicleSlice";

const EditVehicle = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState({});
  const [newVehicle, setNewVehicle] = useState({});
  const [images, setImages] = useState([]);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [vehicleInfoEditMessage, setVehicleInfoEditMessage] = useState({
    status: null,
    message: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the post data
        const vehicleResponse = await axios.get(
          API_ENDPOINT + `/vehicles/${vehicleId}`
        );

        setVehicle(vehicleResponse.data);
        setImages(vehicleResponse.data.images);
        setLoading(false);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching data:", error);
        // navigate to component that shows that this post is no longer available (and leave a link to navigate back to search options)
        // should be implemented in case that user saved a link in browser and after a while tries to access it, but user deleted a post in meantime
        // navigate("/not-found");
      }
    };
    fetchData();
  }, [vehicleId]);

  useEffect(() => {
    const showToast = async () => {
      if (vehicleInfoEditMessage.status === "success") {
        toast.success(vehicleInfoEditMessage.message, {
          autoClose: 5000,
        });
      }
      if (vehicleInfoEditMessage.status === "error") {
        toast.error(vehicleInfoEditMessage.message, {
          autoClose: 5000,
        });
      }
      setVehicleInfoEditMessage({ status: null, message: null });
    };
    showToast();
  }, [vehicleInfoEditMessage.message]);

  const handleNextImage = () => {
    const newImages = [...images];
    const firstImage = newImages.shift();
    newImages.push(firstImage);
    setImages(newImages);
  };

  const handlePreviousImage = () => {
    const newImages = [...images];
    const lastImage = newImages.pop();
    newImages.unshift(lastImage);
    setImages(newImages);
  };

  const validateUpdatedVehicle = (vehicle) => {
    if (
      vehicle.brand === "" ||
      vehicle.carModel === "" ||
      vehicle.year === "" ||
      vehicle.mileage === "" ||
      vehicle.transmission === "" ||
      vehicle.fuel === "" ||
      vehicle.drive === "" ||
      vehicle.engine === ""
    ) {
      return true;
    }

    return false;
  };

  //forbidden for now
  const handleEdit = () => {
    setEdit(!edit);
    setDisableUpdate(true);
    // toast.warn("Edit is disabled for now", {
    //   autoClose: 5000,
    // });
  };

  const handleUpdate = async () => {
    dispatch(
      updateVehicle({
        ...newVehicle,
        _id: vehicleId,
        userId: vehicle.userId,
      })
    )
      .then((res) => {
        setEdit(!edit);
        setDisableUpdate(true);
        setVehicleInfoEditMessage({
          status: "success",
          message: "You have successfully updated your vehicle.",
        });
      })
      .catch((error) => {
        setVehicleInfoEditMessage({
          status: "error",
          message: "Error updating vehicle. Please try again.",
        });
      });
  };

  const handleDelete = async () => {
    dispatch(
      deleteVehicle({
        ...newVehicle,
        _id: vehicleId,
        userId: vehicle.userId,
      })
    )
      .then((res) => {
        dispatch(
          setDeletedVehicle({
            status: "success",
            message: "You have successfully deleted your vehicle.",
          })
        );
        navigate("/profile");
      })
      .catch((error) => {
        dispatch(
          setDeletedVehicle({
            status: "error",
            message: "Error deleting vehicle. Please try again.",
          })
        );
      });
  };

  const handleChange = (name, value) => {
    if (name === "brand") {
      setVehicle({
        ...vehicle,
        [name]: value,
        carModel: "",
      });
      setNewVehicle({
        ...newVehicle,
        [name]: value,
        carModel: "",
      });
    } else {
      setVehicle({ ...vehicle, [name]: value });
      setNewVehicle({ ...newVehicle, [name]: value });
    }
  };

  useEffect(() => {
    if (edit) {
      setDisableUpdate(validateUpdatedVehicle(vehicle));
    }
  }, [vehicle]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const formData = new FormData();

    const selectedFilesArray = Array.from(selectedFiles);

    selectedFilesArray.forEach((file, index) => {
      formData.append(`images[]`, file); // You can use a unique name for each file
    });

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImages(imagesArray);

    setVehicle({
      ...vehicle,
      images: formData.getAll("images[]"),
    });

    setNewVehicle({
      ...newVehicle,
      images: formData.getAll("images[]"),
    });

    event.target.value = "";
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="wd--edit-vehicle--wrapper">
      <Sidebar />
      <div className="wd--edit-vehicle--main">
        <div className="wd--edit-vehicle--navbar-wrapper">
          <Navbar />
        </div>
        <ProfileNavbar />
        <div className="wd--edit-vehicle--content-top">
          <div className="wd--edit-vehicle--content--image">
            <RiArrowLeftSLine
              size={30}
              className="wd--edit-vehicle--content--image-arrow"
              onClick={handlePreviousImage}
            />
            <button
              disabled={!edit}
              className="wd--edit-vehicle--content--upload-photos"
            >
              <label
                // style={edit ? { cursor: "pointer" } : { cursor: "not-allowed" }}
                style={
                  false ? { cursor: "pointer" } : { cursor: "not-allowed" }
                }
              >
                <span>Upload photos</span>
                <MdOutlinePhotoLibrary />
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  disabled={!edit}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
                />
              </label>
            </button>
            <img src={images[0]} alt="car" />
            <RiArrowRightSLine
              size={30}
              className="wd--edit-vehicle--content--image-arrow"
              onClick={handleNextImage}
            />
          </div>
          <div className="wd--edit-vehicle--content--info">
            <h1>
              {vehicle.brand + " " + vehicle.carModel + " " + vehicle.year}
            </h1>
            <div className="wd--edit-vehicle--content--info-details">
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Brand"
                value={vehicle.brand}
                name="brand"
                required
                className="wd--edit-vehicle--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {carModelsArray
                  .sort((a, b) => a.brand.localeCompare(b.brand))
                  .map((item) => (
                    <MenuItem key={item.brand} value={item.brand}>
                      {item.brand}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Model"
                value={vehicle.carModel}
                name="carModel"
                required
                className="wd--edit-vehicle--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {vehicle.brand !== ""
                  ? carModelsArray.map((item) =>
                      item.brand.toLowerCase() === vehicle.brand.toLowerCase()
                        ? item.models
                            .sort((a, b) => a.localeCompare(b))
                            .map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))
                        : null
                    )
                  : null}
              </TextField>
              <TextField
                size="small"
                disabled={!edit}
                label="Year"
                type="number"
                value={vehicle.year}
                name="year"
                required
                className="wd--edit-vehicle--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></TextField>
              <TextField
                size="small"
                disabled={!edit}
                label="Mileage"
                type="number"
                value={vehicle.mileage}
                name="mileage"
                required
                className="wd--edit-vehicle--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></TextField>
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Transmission"
                value={vehicle.transmission}
                name="transmission"
                required
                className="wd--edit-vehicle--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                <MenuItem value="Manual">Manual</MenuItem>
                <MenuItem value="Automatic">Automatic</MenuItem>
              </TextField>
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Fuel"
                value={vehicle.fuel}
                name="fuel"
                required
                className="wd--edit-vehicle--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="LNG">Gas (LNG)</MenuItem>
                <MenuItem value="CNG">Methane (CNG)</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </TextField>
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Drive"
                value={vehicle.drive}
                name="drive"
                required
                className="wd--edit-vehicle--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                <MenuItem value="FWD">FWD</MenuItem>
                <MenuItem value="RWD">RWD</MenuItem>
                <MenuItem value="AWD">AWD</MenuItem>
              </TextField>
              <TextField
                size="small"
                disabled={!edit}
                label="HP"
                type="number"
                value={vehicle.engine}
                name="engine"
                required
                className="wd--edit-vehicle--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></TextField>
            </div>
          </div>
        </div>
        <div className="wd--edit-vehicle--buttons">
          <ButtonDanger onClick={handleDelete} backgroundColor={"#D62828"} md>
            Delete
          </ButtonDanger>
          <div className="wd--edit-vehicle--buttons-right">
            <ButtonPrimary onClick={handleEdit} disabled={edit} sm>
              Edit
            </ButtonPrimary>
            <ButtonSuccess
              onClick={handleUpdate}
              disabled={disableUpdate}
              backgroundColor={"#1fb538"}
              disabledBackgroundColor={"#80c28b"}
              title={
                disableUpdate ? "Please fill all the fields" : "Submit the form"
              }
              md
            >
              Update
            </ButtonSuccess>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVehicle;
