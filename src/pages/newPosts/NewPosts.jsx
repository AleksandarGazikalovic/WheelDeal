import React, { useCallback } from "react";
import { Footer, Navbar, Loading, GoogleMaps, Wave3 } from "../../components";
import { useState } from "react";
import "./newPosts.css";
import { useEffect } from "react";
import { useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../redux/postSlice";
import { setCreatedNewPost } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { LocationAutocomplete } from "../../components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  PiNumberOneBold,
  PiNumberTwoBold,
  PiNumberThreeBold,
  PiNumberFourBold,
} from "react-icons/pi";
import { useDropzone } from "react-dropzone";
import carModelsArray from "../../models/car-models.json";
import { IoCloseSharp, IoCloudUploadOutline } from "react-icons/io5";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const NewPosts = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [clickedPicture, setClickedPicture] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThirdPage] = useState(false);
  const [fourthPage, setFourthPage] = useState(false);
  const imageRef = useRef(null);
  const deleteBtnRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [filled, setFilled] = useState(true);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { postInfo, pending, error } = useSelector((state) => state.post);
  const [postValues, setPostValues] = useState({
    userId: userInfo._id,
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
    location: "",
    price: "",
    from: "",
    to: "",
  });

  const handleInputChange = (name, value) => {
    setPostValues({
      ...postValues,
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

      setPostValues({
        ...postValues,
        images: formData.getAll("images[]"),
      });
    },
    [formData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  console.log(postValues);
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

    setPostValues({
      ...postValues,
      images: formData.getAll("images[]"),
    });
  };

  useEffect(() => {
    const fromDate = state[0].startDate;
    const toDate = state[0].endDate;

    setPostValues({
      ...postValues,
      from: fromDate,
      to: toDate,
      images: formData.getAll("images[]"),
    });
    // console.log(formData.getAll("images[]"));
  }, [state, selectedImages]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Currency code for US dollars
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handlePriceChange = (event) => {
    setEdit(true);
    const numericValue = parseFloat(event.target.value.replace(/[$,]/g, ""));

    // Check if the input is a valid number, greater than zero, and round it to the nearest whole number
    if (!isNaN(numericValue) && numericValue > 0 && numericValue < 1000) {
      const roundedValue = Math.round(numericValue);
      setPrice(roundedValue);
      handleInputChange("price", roundedValue);
    }
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
    } else if (thirdPage) {
      setFilled(true);
      setIsFadingOut(true);
      setTimeout(() => {
        setThirdPage(false);
        setSecondPage(true);
        setIsFadingOut(false);
      }, 1000);
    } else if (fourthPage) {
      setFilled(true);
      setIsFadingOut(true);
      setTimeout(() => {
        setFourthPage(false);
        setThirdPage(true);
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
        setThirdPage(true);
        setIsFadingOut(false);
      }, 1000);
    } else if (thirdPage) {
      if (handleError2()) return;
      setFilled(true);
      setIsFadingOut(true);
      setTimeout(() => {
        setThirdPage(false);
        setFourthPage(true);
        setIsFadingOut(false);
      }, 1000);
    }
  };

  const handleError1 = () => {
    if (
      postValues.images === "" ||
      postValues.brand === "" ||
      postValues.carModel === "" ||
      postValues.year === "" ||
      postValues.mileage === "" ||
      postValues.transmission === "" ||
      postValues.fuel === "" ||
      postValues.drive === "" ||
      postValues.engine === ""
    ) {
      setFilled(false);
      return true;
    }
    return false;
  };

  const handleError2 = () => {
    if (postValues.location === "") {
      setFilled(false);
      return true;
    }
    return false;
  };

  const handleError3 = () => {
    if (
      postValues.price === "" ||
      postValues.from === "" ||
      postValues.to === ""
    ) {
      setFilled(false);
      return true;
    }
    return false;
  };

  const handleCreatePost = async () => {
    try {
      if (handleError3()) return;
      dispatch(createPost(postValues)).then((result) => {
        if (createPost.fulfilled.match(result)) {
          dispatch(
            setCreatedNewPost({
              status: "success",
              message: "Uspešno napravljen novi oglas!",
            })
          );
          navigate("/profile");
        } else if (createPost.rejected.match(result)) {
          dispatch(
            setCreatedNewPost({
              status: "error",
              message: "Došlo je do greške prilikom pravljenja novog oglasa.",
            })
          );
          navigate("/profile");
        }
        // if (!error && !pending) {
        //   dispatch(setCreatedNewPost(true));
        //   navigate("/profile");
        // }
      });
    } catch (error) {
      console.error("Error while creating post: " + error);
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setPostValues({
      ...postValues,
      location: selectedLocation,
    });
  };

  return (
    <div className="gradient_bg2">
      <Navbar />
      <div className="wd--new-post">
        <div className="wd--new-post--wrapper">
          {selectedImages.length > 0 && (
            <div className="wd--new-posts--page-numbers">
              <PiNumberOneBold
                size={30}
                className={`wd--new-posts--page-numbers-one ${
                  firstPage ? "active-page" : ""
                }`}
              />
              <PiNumberTwoBold
                size={30}
                className={`wd--new-posts--page-numbers-two ${
                  secondPage ? "active-page" : ""
                }`}
              />
              <PiNumberThreeBold
                size={30}
                className={`wd--new-posts--page-numbers-three ${
                  thirdPage ? "active-page" : ""
                }`}
              />
              <PiNumberFourBold
                size={30}
                className={`wd--new-posts--page-numbers-three ${
                  fourthPage ? "active-page" : ""
                }`}
              />
            </div>
          )}
          <div className="wd--new-post--container">
            {selectedImages.length === 0 ? (
              <div
                {...getRootProps({ className: "dropzone" })}
                className={
                  `wd--new-post--container-upload-photo` +
                  (isDragActive
                    ? " wd--new-post--container-upload-photo-active"
                    : "")
                }
              >
                <input
                  {...getInputProps()}
                  className="wd--new-post--container-upload-photo-input"
                />
                <IoCloudUploadOutline />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            ) : null}
            {selectedImages.length > 0 && firstPage ? (
              <div>
                <h1 className="wd--new-post--container-images-title">
                  Basic Information
                </h1>
                <div
                  className={`wd--new-post--container-wrapper ${
                    isFadingOut ? "fade-out" : ""
                  }`}
                >
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="vertical">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="wd--new-post--container-images"
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
                                  className="wd--new-post--container-images-image"
                                >
                                  <div className="wd--new-post--container-images-number">
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
                className={`wd--new-post--container-details-section1 ${
                  isFadingOut ? "fade-out" : ""
                }`}
              >
                <h1 className="wd--new-post--container-details-section1-title">
                  Basic Information
                </h1>
                <section>
                  <div className="wd--new-post--container-details-section1-div">
                    <select
                      required
                      className="wd--new-post--container-details-section1-div-input2 style-7"
                      name="brand"
                      value={
                        postValues.brand === "" ? "none" : postValues.brand
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      id="brand"
                    >
                      <option value="none" selected disabled hidden>
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
                  <div className="wd--new-post--container-details-section1-div">
                    <select
                      required
                      className="wd--new-post--container-details-section1-div-input2 style-7"
                      name="carModel"
                      id="carModel"
                      value={
                        postValues.carModel === ""
                          ? "none"
                          : postValues.carModel
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      disabled={postValues.brand === "" ? true : false}
                    >
                      <option value="none" selected disabled hidden>
                        Model
                      </option>
                      {postValues.brand !== ""
                        ? carModelsArray.map((item) =>
                            item.brand.toLowerCase() ===
                            postValues.brand.toLowerCase()
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
                  <div className="wd--new-post--container-details-section1-div">
                    <input
                      required
                      className="wd--new-post--container-details-section1-div-input"
                      type="number"
                      id="year"
                      name="year"
                      value={postValues.year}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <label className="wd--new-post--container-details-section1-div-label">
                      Year
                    </label>
                  </div>
                  <div className="wd--new-post--container-details-section1-div">
                    <input
                      required
                      className="wd--new-post--container-details-section1-div-input"
                      type="number"
                      name="mileage"
                      id="mileage"
                      value={postValues.mileage}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <label className="wd--new-post--container-details-section1-div-label">
                      Kilometers
                    </label>
                  </div>
                </section>
                <div className="wd--new-post--container-details-section1-div">
                  <textarea
                    id="description"
                    className="wd--new-post--container-details-section1-div-input2"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={postValues.description}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>

                <section>
                  <div className="wd--new-post--container-details-section1-div">
                    <select
                      required
                      className="wd--new-post--container-details-section1-div-input2 style-7"
                      name="transmission"
                      id="transmission"
                      value={
                        postValues.transmission === ""
                          ? "none"
                          : postValues.transmission
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="none" selected disabled hidden>
                        Transmission
                      </option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                  <div className="wd--new-post--container-details-section1-div">
                    <select
                      required
                      className="wd--new-post--container-details-section1-div-input2 style-7"
                      name="drive"
                      id="drive"
                      value={
                        postValues.drive === "" ? "none" : postValues.drive
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="none" selected disabled hidden>
                        Drive
                      </option>
                      <option value="FWD">FWD</option>
                      <option value="RWD">RWD</option>
                      <option value="AWD">AWD</option>
                    </select>
                  </div>
                </section>
                <section>
                  <div className="wd--new-post--container-details-section1-div">
                    <select
                      required
                      className="wd--new-post--container-details-section1-div-input2 style-7"
                      name="fuel"
                      id="fuel"
                      value={postValues.fuel === "" ? "none" : postValues.fuel}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="none" selected disabled hidden>
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
                  <div className="wd--new-post--container-details-section1-div">
                    <input
                      required
                      className="wd--new-post--container-details-section1-div-input"
                      type="number"
                      name="engine"
                      id="engine"
                      value={postValues.engine}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <label className="wd--new-post--container-details-section1-div-label">
                      HP
                    </label>
                  </div>
                </section>
              </form>
            ) : null}

            {thirdPage ? (
              <div
                className={`wd--new-post--container-details-section2 ${
                  isFadingOut ? "fade-out" : ""
                }`}
              >
                <h1 className="wd--new-post--container-details-section2-title">
                  Location
                </h1>
                <LocationAutocomplete
                  selectedLocation={postValues.location.address}
                  onSelect={handleLocationSelect}
                />
                <GoogleMaps selectedLocation={postValues.location} />
              </div>
            ) : null}

            {fourthPage ? (
              <div
                className={`wd--new-post--container-details-section2 ${
                  isFadingOut ? "fade-out" : ""
                }`}
              >
                <h1 className="wd--new-post--container-details-section2-title">
                  Rental Details
                </h1>
                <section>
                  <div className="wd--new-post--container-details-section2-price">
                    <input
                      className="wd--new-post--container-details-section2-price-input"
                      type="text"
                      name="price"
                      value={formatCurrency(price)} // Display the formatted price
                      onChange={handlePriceChange} // Handle changes to the input
                      id="price"
                    />
                    <div
                      className="wd--new-post--container-details-section2-price-edit"
                      style={edit ? { display: "none" } : { display: "flex" }}
                    >
                      <FiEdit2 size={20} color="#969696" />
                    </div>
                  </div>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    minDate={new Date()}
                    dragSelectionEnabled={true}
                    ranges={state}
                    style={{
                      width: "300px",
                    }}
                  />
                </section>
              </div>
            ) : null}
          </div>

          {selectedImages.length > 0 ? (
            <div className="wd--new-post--container-buttons">
              <button
                style={{ visibility: !firstPage ? "visible" : "hidden" }}
                disabled={isFadingOut}
                type="button"
                className="wd--new-post--back-btn"
                onClick={handleBack}
              >
                Back
              </button>

              <label
                className="wd--new-post--add-btn"
                style={{
                  visibility: firstPage ? "visible" : "hidden",
                  marginRight: firstPage ? "" : "0",
                }}
              >
                <input
                  {...getInputProps()}
                  className="wd--new-post--add-btn-input"
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

              {fourthPage ? (
                <button
                  type="button"
                  disabled={pending}
                  className="wd--new-post--finish-btn"
                  onClick={handleCreatePost}
                >
                  Finish
                </button>
              ) : (
                <button
                  type="button"
                  className="wd--new-post--next-btn"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          ) : null}
        </div>
        {pending && <Loading />}
        <Wave3 />
      </div>
      <Footer />
    </div>
  );
};

export default NewPosts;
