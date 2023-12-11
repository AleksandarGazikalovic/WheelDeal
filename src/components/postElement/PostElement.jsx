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

  useEffect(() => {
    const fetchOwner = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setOwner(res.data);
    };
    fetchOwner();
  }, [post.userId]);

  const handleHeartClick = async () => {
    try {
      if (userInfo._id !== undefined) {
        setIsLiked(!isLiked); // Toggle the like state
        dispatch(
          likePost({
            postId: post._id,
            userId: userInfo._id,
          })
        );
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
          setIsLiked(true);
        }
      } catch (error) {}
    };
    fetchLikes();
  }, []);

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
          {userInfo._id === post.userId ? null : (
            <FaHeart
              onClick={handleHeartClick}
              style={{ color: isLiked ? "red" : "black" }}
              className="wd--search-content--elements-element-image--like-icon"
            />
          )}
          <Link to={`/post/${post._id}`} key={post._id}>
            <img
              src={post.images[0]}
              alt={post.brand + " " + post.model + " " + post.year}
              onLoad={() => setIsLoaded(true)}
            />
          </Link>
        </div>
        <div className="wd--search-content--elements-element-text">
          <div className="wd--search-content--elements-element-text--left">
            <p className="wd--search-content--elements-element-text--left-model">
              {post.brand + " " + post.model + " " + post.year}
            </p>
            <p className="wd--search-content--elements-element-text--left-location">
              {post.location}
            </p>
            <p className="wd--search-content--elements-element-text--left-date">
              {formattedFromDate + "-" + formattedToDate}
            </p>
            <p className="wd--search-content--elements-element-text--left-price">
              {post.price}€ / dan
            </p>
          </div>
          <div className="wd--search-content--elements-element-text--right">
            <div className="wd--search-content--elements-element-text--right-profile">
              {owner.profileImage ? (
                <img
                  src={owner.profileImage}
                  className="wd--search-content--elements-element-text--right-profile-img"
                />
              ) : (
                <RiAccountCircleFill
                  color="#5e5e5e"
                  className="wd--search-content--elements-element-text--right-profile-img"
                />
              )}
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
