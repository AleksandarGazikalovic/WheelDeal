import React, { useCallback } from "react";
import { Footer, Navbar, Loading, GoogleMaps } from "../../components";
import { useState } from "react";
import "./newPosts.css";
import { useEffect } from "react";
import { useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { setCreatedNewPost } from "../../redux/notificationsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { LocationAutocomplete } from "../../components";
import { useCreatePostMutation } from "../../redux/postSlice";

const NewPosts = () => {
  const { vehicleId } = useParams();
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThirdPage] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [filled, setFilled] = useState(true);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createPost, { isLoading, isSuccess, isError }] =
    useCreatePostMutation();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [post, setPost] = useState({
    userId: userInfo?._id,
    vehicleId,
    location: "",
    price: 0,
    from: "",
    to: "",
  });
  console.log(post);
  useEffect(() => {
    const fromDate = state[0].startDate;
    const toDate = state[0].endDate;

    setPost({
      ...post,
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
      setPost({
        ...post,
        price: roundedValue,
      });
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
      if (handleError1()) return;
      setFilled(true);
      setIsFadingOut(true);
      setTimeout(() => {
        setFirstPage(false);
        setSecondPage(true);
        setIsFadingOut(false);
      }, 1000);
    } else if (secondPage) {
      if (handleError2()) return;
      setFilled(true);
      setIsFadingOut(true);
      setTimeout(() => {
        setSecondPage(false);
        setIsFadingOut(false);
      }, 1000);
    }
  };

  const handleError1 = () => {
    if (post.location === "") {
      setFilled(false);
      return true;
    }
    return false;
  };

  const handleError2 = () => {
    if (post.price === 0 || post.from === "" || post.to === "") {
      setFilled(false);
      return true;
    }
    return false;
  };

  const handleCreatePost = async () => {
    if (handleError2()) return;
    const result = await createPost(post);
    console.log(result);
    if (result.data) {
      dispatch(
        setCreatedNewPost({
          status: "success",
          message: "You have successfully created your post!",
        })
      );
      navigate("/profile");
    } else if (result.error) {
      dispatch(
        setCreatedNewPost({
          status: "error",
          message: "Error occured while making a post.",
        })
      );
      navigate("/profile");
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setPost({
      ...post,
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
                <h1 className="wd--new-post--container-details-section2-title">
                  Location
                </h1>
                <LocationAutocomplete
                  selectedLocation={post.location.address}
                  onSelect={handleLocationSelect}
                />
                <GoogleMaps selectedLocation={post.location} />
              </div>
            ) : null}

            {secondPage ? (
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
                      value={formatCurrency(post.price)} // Display the formatted price
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
            {secondPage ? (
              <button
                type="button"
                disabled={isLoading}
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
        </div>
        {isLoading && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default NewPosts;
