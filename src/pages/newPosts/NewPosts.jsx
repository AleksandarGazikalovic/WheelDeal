import React from "react";
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
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { LocationAutocomplete } from "../../components";
import {
  PiNumberOneBold,
  PiNumberTwoBold,
  PiNumberThreeBold,
  PiNumberFourBold,
} from "react-icons/pi";
import carModelsArray from "../../models/car-models.json";

function ImageItem({ image, onClick }) {
  return (
    <div
      className="wd--new-post--container-images-image"
      onClick={() => onClick(image)}
    >
      <img src={image} alt="" />
    </div>
  );
}

function ImageGallery({ selectedImages, onClick, imageRef }) {
  return (
    <div className="wd--new-post--container-images" ref={imageRef} id="style-7">
      {selectedImages.map((image, index) => (
        <ImageItem key={index} image={image} onClick={onClick} />
      ))}
    </div>
  );
}

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

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;

    const selectedFilesArray = Array.from(selectedFiles);
    selectedFilesArray.forEach((file, index) => {
      formData.append(`images[]`, file); // You can use a unique name for each file
    });

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    setPostValues({
      ...postValues,
      images: formData.getAll("images[]"),
    });

    event.target.value = "";
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

  const handleCreatePost = () => {
    if (handleError3()) return;
    dispatch(createPost(postValues)).then(() => {
      if (!error && !pending) {
        navigate("/profile");
      }
    });
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
              <div className="wd--new-post--container-upload-photo">
                <label>
                  <AiOutlineCloudUpload size={80} />
                  <span>Add up to 10 images</span>
                  <input
                    className="wd--new-post--container-upload-photo-input"
                    type="file"
                    name="images"
                    onChange={onSelectFile}
                    multiple
                    accept="image/png , image/jpeg, image/webp"
                  />
                </label>
              </div>
            ) : null}
            {selectedImages.length > 0 && firstPage ? (
              <div
                className={`wd--new-post--container-wrapper ${
                  isFadingOut ? "fade-out" : ""
                }`}
              >
                <div className="wd--new-post--container-main-photo">
                  {selectedImages.length > 0 && (
                    <img src={selectedImages[0]} alt="" />
                  )}
                </div>

                {selectedImages.length > 1 && (
                  <ImageGallery
                    selectedImages={selectedImages.slice(1)}
                    onClick={handleImageClick}
                    imageRef={imageRef}
                  />
                )}
                {clickedPicture && (
                  <button
                    className="delete-btn"
                    onClick={handleDelete}
                    ref={deleteBtnRef}
                  >
                    <span className="delete-text">Delete</span>
                    <span className="delete-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                      </svg>
                    </span>
                  </button>
                )}
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
              {!firstPage ? (
                <button
                  style={{ visibility: "visible" }}
                  disabled={isFadingOut}
                  type="button"
                  className="wd--new-post--back-btn"
                  onClick={handleBack}
                >
                  Back
                </button>
              ) : (
                <button
                  style={{ visibility: "hidden" }}
                  type="button"
                  className="wd--new-post--back-btn"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}

              {firstPage ? (
                <label
                  className="wd--new-post--add-btn"
                  style={{ visibility: "visible" }}
                >
                  <input
                    className="wd--new-post--add-btn-input"
                    type="file"
                    name="images"
                    onChange={onSelectFile}
                    multiple
                    accept="image/png , image/jpeg, image/webp"
                  />
                  Add Photo
                </label>
              ) : (
                <label
                  className="wd--new-post--add-btn"
                  style={{ visibility: "hidden" }}
                >
                  <input
                    className="wd--new-post--add-btn-input"
                    type="file"
                    name="images"
                    onChange={onSelectFile}
                    multiple
                    accept="image/*"
                  />
                  Add Photo
                </label>
              )}
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
