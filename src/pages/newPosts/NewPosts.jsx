import React, { useCallback } from "react";
import { Footer, Navbar, Loading, GoogleMaps } from "../../components";
import { useState } from "react";
import "./newPosts.css";
import { useEffect } from "react";
import { useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../redux/postSlice";
import { setCreatedNewPost } from "../../redux/notificationsSlice";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { LocationAutocomplete } from "../../components";
import axios from "axios";
import { API_ENDPOINT } from "..";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const NewPosts = () => {
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThirdPage] = useState(false);
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
  const [vehicles, setVehicles] = useState([]);
  const { postInfo, pending, error } = useSelector((state) => state.post);
  const [postValues, setPostValues] = useState({
    userId: userInfo._id,
    vehicleId: "",
    location: "",
    price: "",
    from: "",
    to: "",
  });
  const handleInputChange = (name, value) => {
    console.log(name, value);
    setPostValues({
      ...postValues,
      [name]: value,
    });
  };
  console.log(postValues);
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(
          API_ENDPOINT + `/vehicles/user/${userInfo._id}`
        );
        handleInputChange("vehicleId", res.data[0].vehicleId);
        setVehicles(res.data);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching data:", error);
      }
    };
    fetchVehicles();
  }, [userInfo._id]);

  useEffect(() => {
    const fromDate = state[0].startDate;
    const toDate = state[0].endDate;

    setPostValues({
      ...postValues,
      from: fromDate,
      to: toDate,
    });
    // console.log(formData.getAll("images[]"));
  }, [state]);

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
    }
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
        setIsFadingOut(false);
      }, 1000);
    }
  };

  const handleError1 = () => {
    if (postValues.location === "") {
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

  const handleCreatePost = async () => {
    try {
      if (handleError2()) return;
      dispatch(createPost(postValues)).then((result) => {
        if (createPost.fulfilled.match(result)) {
          dispatch(
            setCreatedNewPost({
              status: "success",
              message: "You have successfully created your post!",
            })
          );
          navigate("/profile");
        } else if (createPost.rejected.match(result)) {
          dispatch(
            setCreatedNewPost({
              status: "error",
              message: "Error occured while making a post.",
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
          <div className="wd--new-post--container">
            {firstPage ? (
              <div
                className={`wd--new-post--container-details-section2 ${
                  isFadingOut ? "fade-out" : ""
                }`}
              >
                {vehicles.length === 0 ? (
                  <div className="wd--new-post--container-no-vehicles">
                    <h1 className="wd--new-post--container-no-vehicles-title">
                      You don't have any vehicles yet
                    </h1>
                    <p>
                      Since you don't have any vehicles added to your profile,
                      you can't create a new post. Please add a vehicle to your
                      profile first.
                    </p>
                    <Link to="/add-vehicle">
                      <h3>Add your first vehicle</h3>
                    </Link>
                  </div>
                ) : (
                  <>
                    <h1 className="wd--new-post--container-details-section2-title">
                      Create a new post
                    </h1>
                    <section>
                      <div className="wd--new-post--container-details-vehicle-div">
                        <h3>Select from your existing vehicles</h3>
                        <select
                          required
                          className="wd--new-post--container-details-vehicle-div-input style-7"
                          name="vehicle"
                          id="vehicleId"
                          onChange={(e) =>
                            handleInputChange(e.target.id, e.target.value)
                          }
                        >
                          {vehicles.length > 0
                            ? vehicles.map((item) => (
                                <option
                                  key={item.vehicleId}
                                  value={item.vehicleId}
                                >
                                  {item.brand +
                                    " " +
                                    item.carModel +
                                    " " +
                                    item.year}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                      <div className="wd--new-post--container-details-vehicle-or-wrapper">
                        <span className="wd--new-post--container-details-vehicle-or">
                          Or
                        </span>
                      </div>
                      <div className="wd--new-post--container-details-vehicle-div">
                        <Link to="/add-vehicle">
                          <p> Add your new vehicle right now</p>
                        </Link>
                      </div>
                    </section>
                  </>
                )}
              </div>
            ) : null}

            {secondPage ? (
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
          {vehicles.length !== 0 ? (
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
              {!filled ? (
                <span style={{ fontWeight: 700 }}>
                  "Please fill in all the fields!"
                </span>
              ) : null}
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
                  disabled={vehicles.length === 0 && firstPage}
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

export default NewPosts;
