import React from "react";
import {
  Footer,
  Navbar,
  Loading,
  GoogleMaps,
  Comments,
  Wave3,
} from "../../components";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  IoLocationSharp,
  IoStar,
  IoInformationCircleOutline,
  IoHeartOutline,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoChatbubbleOutline,
  IoHeart,
} from "react-icons/io5";
import { DateRange } from "react-date-range";
import { likePost } from "../../redux/userSlice";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const CarPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [owner, setOwner] = useState({});
  const [images, setImages] = useState([]);
  const [timeJoined, setTimeJoined] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [like, setLike] = useState(false);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const postDates = {
    startDate: new Date(post.from),
    endDate: new Date(post.to),
  };
  const [disabledDates, setDisabledDates] = useState([]);

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
        setLoading(false);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching data:", error);
      }
    };
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          API_ENDPOINT + `/bookings/post/${postId}/dates`
        );
        const dates = response.data.map((date) => new Date(date));
        setDisabledDates(dates);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
    fetchBookings();
  }, [postId]);

  const handleLike = async () => {
    try {
      if (userInfo._id !== undefined) {
        dispatch(
          likePost({
            postId: post._id,
            userId: userInfo._id,
          })
        );
        setLike(!like); // Toggle the like state
      } else setShowLoginForm(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // Check if the post ID is in the likedPosts array
        if (userInfo.likedPosts.includes(post._id)) {
          setLike(true);
        }
      } catch (error) {}
    };
    fetchLikes();
  }, [post._id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="gradient_bg2">
      <Navbar
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
      />
      <div className="wd--post-wrapper">
        <div className="wd--post-wrapper--info">
          <div className="wd--post-wrapper--info-top">
            <div className="wd--post-wrapper--info-top-left">
              <div className="wd--post-wrapper--info-top-left--text">
                <h1>
                  {post.brand} {post.carModel} {post.year}
                </h1>
                <div className="wd--post-wrapper--info-top-left--rating">
                  <IoStar size={20} color="#ffd900" />
                  <h4>
                    {post.rating ? post.rating : "No rating available yet"}
                  </h4>
                </div>
                <div className="wd--post-wrapper--info-top-left--location">
                  <IoLocationSharp size={20} color="#f77f00" />
                  <h4>{post.location != null && post.location.address}</h4>
                </div>
              </div>
              <div className="wd--post-wrapper--info-top-left--images">
                <Carousel
                  showArrows={true}
                  autoPlay={true}
                  interval={3000}
                  swipeable={true}
                  emulateTouch={true}
                  infiniteLoop={true}
                  showThumbs={false}
                >
                  {images.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt="car" />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="wd--post-wrapper--info-top-right">
              <div className="wd--post-wrapper--info-top-right--booking">
                <div className="wd--post-wrapper--info-top-right--price">
                  <h2>
                    <b>{post.price} € </b>/ day
                  </h2>
                  <p>
                    Check how the price is calculated
                    <IoInformationCircleOutline size={15} />
                  </p>
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
                      defaultValue={dayjs().add(7, "day")}
                      ampm={false}
                      format="DD/MM/YYYY HH:mm"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <button className="wd--post-wrapper--info-top-right--button">
                  Book
                </button>
                <div className="wd--post-wrapper--info-top-right--offers">
                  <Link to="/search-options">
                    <h4>
                      Not what you are looking for? <br /> Check out our other
                      offers!
                    </h4>
                  </Link>
                </div>
              </div>
              <div className="wd--post-wrapper--info-top-right--socials">
                <button onClick={handleLike}>
                  {like ? (
                    <IoHeart size={25} color="red" />
                  ) : (
                    <IoHeartOutline size={25} />
                  )}
                  Add to favorites
                </button>
                <div className="wd--post-wrapper--info-top-right--socials-buttons">
                  {owner.socials && owner.socials.twitter ? (
                    <a
                      href={owner.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IoLogoTwitter size={30} />
                    </a>
                  ) : (
                    <IoLogoTwitter size={30} />
                  )}
                  {owner.socials && owner.socials.facebook ? (
                    <a
                      href={owner.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IoLogoFacebook size={30} />
                    </a>
                  ) : (
                    <IoLogoFacebook size={30} />
                  )}

                  {owner.socials && owner.socials.linkedin ? (
                    <a
                      href={owner.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IoLogoLinkedin size={30} />
                    </a>
                  ) : (
                    <IoLogoLinkedin size={30} />
                  )}
                  <IoChatbubbleOutline size={30} />
                </div>
              </div>
            </div>
          </div>
          <div className="wd--post-wrapper--info-bottom">
            <div className="wd--post-wrapper--info-bottom-left">
              <section className="wd--post-wrapper--info-bottom-left-specs">
                <h2>Car Specifications</h2>
                <div className="wd--post-wrapper--info-bottom-left-specs-grid">
                  <div className="wd--post-wrapper--info-bottom-left--drive">
                    <GiCartwheel size={30} />
                    <p>{post.drive}</p>
                  </div>
                  <div className="wd--post-wrapper--info-bottom-left--transmission">
                    <p>{post.transmission}</p>
                  </div>
                  <div className="wd--post-wrapper--info-bottom-left--fuel">
                    <PiGasPump size={30} />
                    <p>{post.fuel}</p>
                  </div>
                  <div className="wd--post-wrapper--info-bottom-left--engine">
                    <PiEngineLight size={30} />
                    <p>{post.engine}</p>
                  </div>
                </div>
              </section>
              <section className="wd--post-wrapper--info-bottom-left--profile">
                <h2>Host</h2>
                <div className="wd--post-wrapper--info-bottom-left--profile-info">
                  <div className="wd--post-wrapper--info-bottom-left--profile-info-image">
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
                  <div className="wd--post-wrapper--info-bottom-left--profile-info-right">
                    <p className="wd--post-wrapper--info-bottom-left--profile-info-name">
                      {owner.name} {owner.surname}
                    </p>
                    <span>{owner.email}</span>
                    <span>Joined {timeJoined}</span>
                  </div>
                </div>
              </section>
              <div className="wd--post-wrapper--info-bottom-left--description">
                <h2>Description</h2>
                <p>
                  {post.description
                    ? post.description
                    : "No description available"}
                </p>
              </div>
            </div>
            <div className="wd--post-wrapper--info-bottom-right--calendar">
              <h2>Available dates</h2>
              <DateRange
                disabledDates={disabledDates}
                ranges={
                  [
                    {
                      startDate: postDates.startDate,
                      endDate: postDates.endDate,
                      key: "selection",
                    },
                  ] // Set the available dates
                } // Convert the dates to the correct format
                rangeColors={[""]}
                style={{
                  width: "270px",
                  pointerEvents: "none",
                }}
                fixedHeight={true}
                editableDateInputs={false}
                showDateDisplay={false}
              />
            </div>
          </div>
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
