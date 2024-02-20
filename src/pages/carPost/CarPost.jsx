import React from "react";
import {
  Footer,
  Navbar,
  Loading,
  GoogleMaps,
  Comments,
  Wave3,
} from "../../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./carPost.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { HiArrowSmLeft } from "react-icons/hi";
import { PiEngineLight, PiGasPump } from "react-icons/pi";
import { GiCartwheel } from "react-icons/gi";
import { format } from "date-fns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const CarPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [owner, setOwner] = useState({});
  const [images, setImages] = useState([]);
  const [timeJoined, setTimeJoined] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the post data
        const postResponse = await axios.get(API_ENDPOINT + `/posts/${postId}`);

        setPost(postResponse.data);
        setImages(postResponse.data.images);

        // Fetch the owner data using the post data
        const ownerResponse = await axios.get(
          API_ENDPOINT + `/users/${postResponse.data.userId}`
        );
        setOwner(ownerResponse.data);
        setTimeJoined(
          format(new Date(ownerResponse.data.createdAt), "MMM yyyy")
        );
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [postId]);

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

  return (
    <div className="gradient_bg2">
      <Navbar
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
      />
      <div className="wd--post-wrapper">
        <div className="wd--post-wrapper--images">
          <img src={images[0]} alt="car" />
          <div className="wd--post-wrapper--images--btns">
            <HiArrowSmLeft onClick={handlePreviousImage} />
            <HiArrowSmRight onClick={handleNextImage} />
          </div>
        </div>
        <div className="wd--post-wrapper--info">
          <section className="wd--post-wrapper--info-top">
            <div className="wd--post-wrapper--info-top-left">
              <div className="wd--post-wrapper--info-top-left--title">
                <h1>
                  {post.brand} {post.carModel} {post.year}
                </h1>
              </div>
              <div className="wd--post-wrapper--info-top-left--location">
                <p>{post.location != null && post.location.address}</p>
              </div>
              {/* <div className="wd--post-wrapper--info-top-right--rating">
                <h2>Rating</h2>
              </div> */}
              <section className="wd--post-wrapper--info-top-left-specs">
                <h2>Car Specifications</h2>
                <div className="wd--post-wrapper--info-top-left-specs-grid">
                  <div className="wd--post-wrapper--info-top-left--drive">
                    <GiCartwheel size={30} />
                    <p>{post.drive}</p>
                  </div>
                  <div className="wd--post-wrapper--info-top-left--transmission">
                    <p>{post.transmission}</p>
                  </div>
                  <div className="wd--post-wrapper--info-top-left--fuel">
                    <PiGasPump size={30} />
                    <p>{post.fuel}</p>
                  </div>
                  <div className="wd--post-wrapper--info-top-left--engine">
                    <PiEngineLight size={30} />
                    <p>{post.engine}</p>
                  </div>
                </div>
              </section>
              <section className="wd--post-wrapper--info-top-left--profile">
                <h2>Host</h2>
                <div className="wd--post-wrapper--info-top-left--profile-info">
                  <div className="wd--post-wrapper--info-top-left--profile-info-image">
                    <Avatar
                      sx={{
                        width: "inherit",
                        height: "inherit",
                        backgroundColor: owner.profileImage ? "" : "#003049",
                      }}
                      src={owner.profileImage}
                      alt={owner.firstname + " " + owner.lastname}
                    />
                  </div>
                  <div className="wd--post-wrapper--info-top-left--profile-info-right">
                    <p className="wd--post-wrapper--info-top-left--profile-info-name">
                      {owner.name} {owner.surname}
                    </p>
                    <span>{owner.email}</span>
                    <span>Joined {timeJoined}</span>
                  </div>
                </div>
              </section>
              <div className="wd--post-wrapper--info-top-left--description">
                <h2>Description</h2>
                <p>
                  {post.description
                    ? post.description
                    : "No description available"}
                </p>
              </div>
            </div>
            <div className="wd--post-wrapper--info-top-right">
              <div className="wd--post-wrapper--info-top-right--booking">
                <div className="wd--post-wrapper--info-top-right--price">
                  <h1>
                    <b>{post.price} € </b>/ day
                  </h1>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      className="wd--post-wrapper--info-top-right--start-date"
                      label="Trip start"
                      defaultValue={dayjs()}
                      ampm={false}
                      format="DD/MM/YYYY HH:mm"
                    />
                  </DemoContainer>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      className="wd--post-wrapper--info-top-right--end-date"
                      label="Trip end"
                      defaultValue={dayjs().add(3, "day")}
                      ampm={false}
                      format="DD/MM/YYYY HH:mm"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <button className="wd--post-wrapper--info-top-right--button">
                  Book
                </button>
              </div>
            </div>
          </section>
          <div className="wd--post-wrapper-info-comments">
            <h2> Reviews </h2>
            {owner && <Comments user_id={owner._id} />}
          </div>
          <GoogleMaps selectedLocation={post.location} />
        </div>
        <Wave3 />
      </div>
      <Footer />
    </div>
  );
};

export default CarPost;
