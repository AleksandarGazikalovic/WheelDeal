import React from "react";
import { Footer, Navbar, Loading } from "../../components";
import { useState } from "react";
import "./newPosts.css";
import { GoPlus } from "react-icons/go";
import { useEffect } from "react";
import { useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../redux/postSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  PiNumberOneBold,
  PiNumberTwoBold,
  PiNumberThreeBold,
} from "react-icons/pi";
import carModelsArray from "../../models/car-models.json";
import locations from "../../models/locations.json";

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
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThirdPage] = useState(false);
  const imageRef = useRef(null);
  const deleteBtnRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [filled, setFilled] = useState(true);
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
    model: "",
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
    casco: "",
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
    });
  }, [state]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Currency code for US dollars
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handlePriceChange = (event) => {
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
    const formData = new FormData();

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
      }
    }
  };

  const handleBack = () => {
    if (secondPage) {
      setFilled(true);
      setIsFadingOut(true); // Apply "fade-out" class
      setTimeout(() => {
        setSecondPage(false);
        setFirstPage(true);
        setIsFadingOut(false); // Remove "fade-out" class
      }, 1000); // Delay the transition for 0.5 seconds (adjust as needed)
    } else if (thirdPage) {
      setFilled(true);
      setIsFadingOut(true); // Apply "fade-out" class
      setTimeout(() => {
        setThirdPage(false);
        setSecondPage(true);
        setIsFadingOut(false); // Remove "fade-out" class
      }, 1000); // Delay the transition for 0.5 seconds (adjust as needed)
    }
    // ... (rest of your code)
  };

  const handleNext = () => {
    if (firstPage) {
      setIsFadingOut(true); // Apply "fade-out" class
      setTimeout(() => {
        setFirstPage(false);
        setSecondPage(true);
        setIsFadingOut(false); // Remove "fade-out" class
      }, 1000); // Delay the transition for 0.5 seconds (adjust as needed)
    } else if (secondPage) {
      if (handleError1()) return;
      setFilled(true);
      setIsFadingOut(true); // Apply "fade-out" class
      setTimeout(() => {
        setSecondPage(false);
        setThirdPage(true);
        setIsFadingOut(false); // Remove "fade-out" class
      }, 1000); // Delay the transition for 0.5 seconds (adjust as needed)
    }
  };

  const handleError1 = () => {
    if (
      postValues.images === "" ||
      postValues.brand === "" ||
      postValues.model === "" ||
      postValues.year === "" ||
      postValues.mileage === "" ||
      postValues.transmission === "" ||
      postValues.fuel === "" ||
      postValues.drive === "" ||
      postValues.engine === "" ||
      postValues.location === "" ||
      postValues.casco === ""
    ) {
      setFilled(false);
      return true;
    }
    return false;
  };

  const handleError2 = () => {
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
    if (handleError2()) return;
    dispatch(createPost(postValues)).then(() => {
      if (!error && !pending) {
        navigate("/profile");
      }
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
                      name="model"
                      id="model"
                      value={
                        postValues.model === "" ? "none" : postValues.model
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
                <section>
                  <div className="wd--new-post--container-details-section1-div">
                    <select
                      required
                      className="wd--new-post--container-details-section1-div-input2 style-7"
                      name="casco"
                      id="casco"
                      value={
                        postValues.casco === "" ? "none" : postValues.casco
                      }
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="none" selected disabled hidden>
                        Casco
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="wd--new-post--container-details-section1-div">
                    <select
                      required
                      className="wd--new-post--container-details-section1-div-input2"
                      name="location"
                      id="location"
                      value={postValues.location}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                      <option value="none" selected disabled hidden>
                        Location
                      </option>
                      {locations
                        .sort((a, b) => a.city.localeCompare(b.city))
                        .map((item, index) => (
                          <option key={index + 1} value={item.city}>
                            {item.city}
                          </option>
                        ))}
                    </select>
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
                    accept="image/png , image/jpeg, image/webp"
                  />
                  Add Photo
                </label>
              )}
              {!filled ? <span>"Please fill in all the fields!"</span> : null}

              {thirdPage ? (
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
        <div className="wave3">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill3"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill3"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill3"
            ></path>
          </svg>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewPosts;
