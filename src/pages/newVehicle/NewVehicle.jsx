import React, { useCallback } from "react";
import { Footer, Navbar, Loading } from "../../components";
import { useState } from "react";
import "./newVehicle.css";
import { useEffect } from "react";
import { useRef } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PiNumberOneBold, PiNumberTwoBold } from "react-icons/pi";
import { useDropzone } from "react-dropzone";
import carModelsArray from "../../models/car-models.json";
import { IoCloseSharp, IoCloudUploadOutline } from "react-icons/io5";
import { createVehicle } from "../../redux/vehicleSlice";
import { setCreatedNewVehicle } from "../../redux/notificationsSlice";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const NewVehicle = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [clickedPicture, setClickedPicture] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const imageRef = useRef(null);
  const deleteBtnRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const dispatch = useDispatch();
  const [filled, setFilled] = useState(true);
  const navigate = useNavigate();
  const { vehicleInfo, pending, error } = useSelector((state) => state.vehicle);
  const [vehicleValues, setVehicleValues] = useState({
    images: "",
    brand: "",
    carModel: "",
    year: "",
    description: "",
    mileage: "",
    transmission: "",
    fuel: "",
    drive: "",
    engine: "",
  });

  const handleInputChange = (name, value) => {
    setVehicleValues({
      ...vehicleValues,
      [name]: value,
    });
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Update state with the new uploaded images
      const newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);

      // Append new images to formData
      acceptedFiles.forEach((file) => {
        formData.append("images[]", file);
      });

      setVehicleValues({
        ...vehicleValues,
        images: formData.getAll("images[]"),
      });
    },
    [formData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // This function is called when the final drop event occurs
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      selectedImages,
      result.source.index,
      result.destination.index
    );

    setSelectedImages(items);

    // Reorder formData based on the new order of images
    // First, clear the existing 'images[]' entries from formData
    formData.delete("images[]");

    // Then, append reordered images to formData
    items.forEach((item) => {
      // Assuming `item` still contains the File object
      formData.append("images[]", item);
    });

    setVehicleValues({
      ...vehicleValues,
      images: formData.getAll("images[]"),
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        imageRef.current &&
        !imageRef.current.contains(event.target) &&
        deleteBtnRef.current &&
        !deleteBtnRef.current.contains(event.target)
      ) {
        setClickedPicture(null);
      }
    }

    // Add a click event listener to the entire document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageClick = (image) => {
    setClickedPicture(image);
  };

  const handleDelete = () => {
    if (clickedPicture) {
      const index = selectedImages.indexOf(clickedPicture);
      if (index !== -1) {
        // Create a copy of the selectedImages array and remove the clicked image
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
        setClickedPicture(null);

        let images = formData.getAll("images[]");
        formData.delete("images[]");
        images.splice(index, 1);

        const selectedFilesArray = Array.from(images);
        selectedFilesArray.forEach((file, index) => {
          formData.append(`images[]`, file); // You can use a unique name for each file
        });
      }
    }
  };

  const handleBack = () => {
    if (secondPage) {
      setFilled(true);
      setIsFadingOut(true);
      setTimeout(() => {
        setSecondPage(false);
        setFirstPage(true);
        setIsFadingOut(false);
      }, 1000);
    }
    // ... (rest of your code)
  };

  const handleNext = () => {
    if (firstPage) {
      setIsFadingOut(true);
      setTimeout(() => {
        setFirstPage(false);
        setSecondPage(true);
        setIsFadingOut(false);
      }, 1000);
    } else if (secondPage) {
      if (handleError1()) return;
      setFilled(true);
      setIsFadingOut(true);
      setTimeout(() => {
        setSecondPage(false);
        setIsFadingOut(false);
      }, 1000);
    }
  };

  const handleError1 = () => {
    if (
      vehicleValues.images === "" ||
      vehicleValues.brand === "" ||
      vehicleValues.carModel === "" ||
      vehicleValues.year === "" ||
      vehicleValues.mileage === "" ||
      vehicleValues.transmission === "" ||
      vehicleValues.fuel === "" ||
      vehicleValues.drive === "" ||
      vehicleValues.engine === ""
    ) {
      setFilled(false);
      return true;
    }
    return false;
  };
  const handleCreateVehicle = async () => {
    try {
      if (handleError1()) return;
      dispatch(createVehicle(vehicleValues)).then((result) => {
        if (createVehicle.fulfilled.match(result)) {
          dispatch(
            setCreatedNewVehicle({
              status: "success",
              message: "You have successfully added your vehicle!",
            })
          );
          navigate(`/onboarding/${result.payload._id}`);
        } else if (createVehicle.rejected.match(result)) {
          dispatch(
            setCreatedNewVehicle({
              status: "error",
              message: "Error occured while adding your vehicle.",
            })
          );
          navigate("/profile");
        }
        // if (!error && !pending) {
        //   dispatch(setCreatedNewVehicle(true));
        //   navigate("/profile");
        // }
      });
    } catch (error) {
      console.error("Error while creating Vehicle: " + error);
    }
  };

  return (
    <div className="gradient_bg2">
      <Navbar />
      <div className="wd--new-vehicle">
        <div className="wd--new-vehicle--wrapper">
          {selectedImages.length > 0 && (
            <div className="wd--new-vehicles--page-numbers">
              <PiNumberOneBold
                size={30}
                className={`wd--new-vehicles--page-numbers-one ${
                  firstPage ? "active-page" : ""
                }`}
              />
              <PiNumberTwoBold
                size={30}
                className={`wd--new-vehicles--page-numbers-two ${
                  secondPage ? "active-page" : ""
                }`}
              />
            </div>
          )}
          <div className="wd--new-vehicle--container">
            {selectedImages.length === 0 ? (
              <div
                {...getRootProps({ className: "dropzone" })}
                className={
                  `wd--new-vehicle--container-upload-photo` +
                  (isDragActive
                    ? " wd--new-vehicle--container-upload-photo-active"
                    : "")
                }
              >
                <input
                  {...getInputProps()}
                  className="wd--new-vehicle--container-upload-photo-input"
                />
                <IoCloudUploadOutline />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            ) : null}
            {selectedImages.length > 0 && firstPage ? (
              <div>
                <h1 className="wd--new-vehicle--container-images-title">
                  Your vehicle images
                </h1>
                <div
                  className={`wd--new-vehicle--container-wrapper ${
                    isFadingOut ? "fade-out" : ""
                  }`}
                >
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="vertical">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            overflowY:
                              selectedImages.length === 1 ? "hidden" : "",
                          }}
                          className="wd--new-vehicle--container-images"
                        >
                          {selectedImages.map((item, index) => (
                            <Draggable
                              key={item.preview}
                              draggableId={item.preview}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => handleImageClick(item)}
                                  className="wd--new-vehicle--container-images-image"
                                >
                                  <div className="wd--new-vehicle--container-images-number">
                                    {index + 1}
                                  </div>
                                  <img
                                    src={item.preview}
                                    alt={`preview-${index}`}
                                  />
                                  {clickedPicture === item && (
                                    <IoCloseSharp
                                      className="wd--new-pot-container-images-delete-image"
                                      onClick={handleDelete}
                                      ref={deleteBtnRef}
                                    />
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            ) : null}
            {secondPage ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className={`wd--new-vehicle--container-details-section1 ${
                  isFadingOut ? "fade-out" : ""
                }`}
              >
                <h1 className="wd--new-vehicle--container-details-section1-title">
                  Basic Information
                </h1>
                <section>
                  <div className="wd--new-vehicle--container-details-section1-div">
                    <select
                      required
                      className="wd--new-vehicle--container-details-section1-div-input2 style-7"
                      name="brand"
                      value={
                        vehicleValues.brand === ""
                          ? "none"
                          : vehicleValues.brand
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      id="brand"
                    >
                      <option value="none" disabled hidden>
                        Brand
                      </option>
                      {carModelsArray
                        .sort((a, b) => a.brand.localeCompare(b.brand))
                        .map((item) => (
                          <option key={item.brand} value={item.brand}>
                            {item.brand}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="wd--new-vehicle--container-details-section1-div">
                    <select
                      required
                      className="wd--new-vehicle--container-details-section1-div-input2 style-7"
                      name="carModel"
                      id="carModel"
                      value={
                        vehicleValues.carModel === ""
                          ? "none"
                          : vehicleValues.carModel
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      disabled={vehicleValues.brand === "" ? true : false}
                    >
                      <option value="none" disabled hidden>
                        Model
                      </option>
                      {vehicleValues.brand !== ""
                        ? carModelsArray.map((item) =>
                            item.brand.toLowerCase() ===
                            vehicleValues.brand.toLowerCase()
                              ? item.models
                                  .sort((a, b) => a.localeCompare(b))
                                  .map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))
                              : null
                          )
                        : null}
                    </select>
                  </div>
                </section>
                <section>
                  <div className="wd--new-vehicle--container-details-section1-div">
                    <input
                      required
                      className="wd--new-vehicle--container-details-section1-div-input"
                      type="number"
                      id="year"
                      name="year"
                      value={vehicleValues.year}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <label className="wd--new-vehicle--container-details-section1-div-label">
                      Year
                    </label>
                  </div>
                  <div className="wd--new-vehicle--container-details-section1-div">
                    <input
                      required
                      className="wd--new-vehicle--container-details-section1-div-input"
                      type="number"
                      name="mileage"
                      id="mileage"
                      value={vehicleValues.mileage}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <label className="wd--new-vehicle--container-details-section1-div-label">
                      Kilometers
                    </label>
                  </div>
                </section>
                <div className="wd--new-vehicle--container-details-section1-div">
                  <textarea
                    id="description"
                    className="wd--new-vehicle--container-details-section1-div-input2"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={vehicleValues.description}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>

                <section>
                  <div className="wd--new-vehicle--container-details-section1-div">
                    <select
                      required
                      className="wd--new-vehicle--container-details-section1-div-input2 style-7"
                      name="transmission"
                      id="transmission"
                      value={
                        vehicleValues.transmission === ""
                          ? "none"
                          : vehicleValues.transmission
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="none" disabled hidden>
                        Transmission
                      </option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                  <div className="wd--new-vehicle--container-details-section1-div">
                    <select
                      required
                      className="wd--new-vehicle--container-details-section1-div-input2 style-7"
                      name="drive"
                      id="drive"
                      value={
                        vehicleValues.drive === ""
                          ? "none"
                          : vehicleValues.drive
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="none" disabled hidden>
                        Drive
                      </option>
                      <option value="FWD">FWD</option>
                      <option value="RWD">RWD</option>
                      <option value="AWD">AWD</option>
                    </select>
                  </div>
                </section>
                <section>
                  <div className="wd--new-vehicle--container-details-section1-div">
                    <select
                      required
                      className="wd--new-vehicle--container-details-section1-div-input2 style-7"
                      name="fuel"
                      id="fuel"
                      value={
                        vehicleValues.fuel === "" ? "none" : vehicleValues.fuel
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="none" disabled hidden>
                        Fuel
                      </option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="LNG">Gas (LNG)</option>
                      <option value="CNG">Methane (CNG)</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="wd--new-vehicle--container-details-section1-div">
                    <input
                      required
                      className="wd--new-vehicle--container-details-section1-div-input"
                      type="number"
                      name="engine"
                      id="engine"
                      value={vehicleValues.engine}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <label className="wd--new-vehicle--container-details-section1-div-label">
                      HP
                    </label>
                  </div>
                </section>
              </form>
            ) : null}
          </div>

          {selectedImages.length > 0 ? (
            <div className="wd--new-vehicle--container-buttons">
              <button
                style={{ visibility: !firstPage ? "visible" : "hidden" }}
                disabled={isFadingOut}
                type="button"
                className="wd--new-vehicle--back-btn"
                onClick={handleBack}
              >
                Back
              </button>

              <label
                className="wd--new-vehicle--add-btn"
                style={{
                  visibility: firstPage ? "visible" : "hidden",
                  marginRight: firstPage ? "" : "0",
                }}
              >
                <input
                  {...getInputProps()}
                  className="wd--new-vehicle--add-btn-input"
                  type="file"
                  name="images"
                  //onChange={onSelectFile}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
                />
                Add Photo
              </label>

              {!filled ? (
                <span style={{ fontWeight: 700 }}>
                  "Please fill in all the fields!"
                </span>
              ) : null}

              {secondPage ? (
                <button
                  type="button"
                  disabled={pending}
                  className="wd--new-vehicle--finish-btn"
                  onClick={handleCreateVehicle}
                >
                  Finish
                </button>
              ) : (
                <button
                  type="button"
                  className="wd--new-vehicle--next-btn"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          ) : null}
        </div>
        {pending && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default NewVehicle;
