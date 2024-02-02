import React from "react";
import {
  Footer,
  Navbar,
  Loading,
  GoogleMaps,
  Comments,
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
        const postResponse = await axios.get(`/posts/${postId}`);

        setPost(postResponse.data);
        setImages(postResponse.data.images);

        // Fetch the owner data using the post data
        const ownerResponse = await axios.get(
          `/users/${postResponse.data.userId}`
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
                  {post.brand} {post.model} {post.year}
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

export default CarPost;
