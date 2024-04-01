import React, { forwardRef } from "react";
import "./postElement.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likePost } from "../../redux/userSlice";
import PostElementSkeleton from "../postElementSkeleton/PostElementSkeleton";
import { Avatar } from "@mui/material";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const PostElement = React.forwardRef(({ post, setShowLoginForm }, ref) => {
  const [isLiked, setIsLiked] = useState(false);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const fromDate = new Date(post.from);
  const toDate = new Date(post.to);
  const options = { month: "short", day: "numeric" };
  const formattedFromDate = fromDate.toLocaleDateString(undefined, options);
  const formattedToDate = toDate.toLocaleDateString(undefined, options);
  const [owner, setOwner] = useState({});
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [price, setPrice] = useState(post.price);
  const currency = useSelector((state) => state.currency);

  useEffect(() => {
    const fetchOwner = async () => {
      const res = await axios.get(API_ENDPOINT + `/users/${post.userId}`);
      setOwner(res.data);
    };
    fetchOwner();
  }, [post.userId]);

  const handleHeartClick = async () => {
    try {
      if (userInfo._id !== undefined) {
        dispatch(
          likePost({
            postId: post._id,
            userId: userInfo._id,
          })
        );
        setIsLiked(!isLiked); // Toggle the like state
      } else setShowLoginForm(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  useEffect(() => {
    if (currency.name === "EUR") {
      setPrice(post.price);
    } else {
      setPrice(post.price * currency.rate);
    }
  }, [currency]);

  useEffect(() => {
    const fetchLikes = async () => {
      console.log(userInfo);
      console.log(userInfo.likedPosts);
      console.log(post._id);
      try {
        // Check if the post ID is in the likedPosts array
        if (userInfo.likedPosts.includes(post._id)) {
          setIsLiked(true);
        }
      } catch (error) {}
    };
    fetchLikes();
  }, [post._id]);

  return (
    <>
      <PostElementSkeleton isLoaded={isLoaded} />
      <div
        key={post._id}
        className={`wd--search-content--elements-element ${
          isLoaded ? "wd--search-content--elements-element-loaded" : ""
        }`}
        ref={ref}
      >
        <div className="wd--search-content--elements-element-image">
          {userInfo._id === post.userId ? (
            <Link to={`/profile/${post._id}`} key={post._id}>
              <img
                src={post.vehicle.images[0]}
                alt={
                  post.vehicle.brand +
                  " " +
                  post.vehicle.carModel +
                  " " +
                  post.vehicle.year
                }
                onLoad={() => setIsLoaded(true)}
              />
            </Link>
          ) : (
            <>
              <div
                className="wd--search-content--elements-element-image--like"
                onClick={handleHeartClick}
              >
                <FaHeart
                  style={{ color: isLiked ? "red" : "black" }}
                  className="wd--search-content--elements-element-image--like-icon"
                />
              </div>
              <Link to={`/post/${post._id}`} key={post._id}>
                <img
                  src={post.vehicle.images[0]}
                  alt={
                    post.vehicle.brand +
                    " " +
                    post.vehicle.carModel +
                    " " +
                    post.vehicle.year
                  }
                  onLoad={() => setIsLoaded(true)}
                />
              </Link>
            </>
          )}
        </div>
        <div className="wd--search-content--elements-element-text">
          <div className="wd--search-content--elements-element-text--left">
            <p className="wd--search-content--elements-element-text--left-model">
              {post.vehicle.brand +
                " " +
                post.vehicle.carModel +
                " " +
                post.vehicle.year}
            </p>
            <p className="wd--search-content--elements-element-text--left-location">
              {post.location.address}
            </p>
            <p className="wd--search-content--elements-element-text--left-date">
              {formattedFromDate + "-" + formattedToDate}
            </p>
            <p className="wd--search-content--elements-element-text--left-price">
              {Math.round(price)} {currency.name === "EUR" ? "€" : "RSD"} / dan
            </p>
          </div>
          <div className="wd--search-content--elements-element-text--right">
            <div className="wd--search-content--elements-element-text--right-profile">
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
            {/* <div className="wd--search-content--elements-element-text--right-rating">
                {} <AiFillStar />
              </div> */}
          </div>
          {/* <h3>{image.message.split("/")[4]}</h3> */}
        </div>
      </div>
    </>
  );
});

export default PostElement;
