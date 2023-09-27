import React from "react";
import "./filterElement.css";
import axios from "axios";
import noAvatar from "../../assets/noAvatar.png";
import { AiFillStar } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { RiAccountCircleFill } from "react-icons/ri";

const FilterElement = ({ post, isLoading, setShowLoginForm }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isLiked, setIsLiked] = useState(false);
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const fromDate = new Date(post.from);
  const toDate = new Date(post.to);

  const options = { month: "short", day: "numeric" };
  const formattedFromDate = fromDate.toLocaleDateString(undefined, options);
  const formattedToDate = toDate.toLocaleDateString(undefined, options);
  const [owner, setOwner] = useState({});

  useEffect(() => {
    const fetchOwner = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setOwner(res.data);
    };
    fetchOwner();
  }, [post.userId]);

  console.log("owner", owner);

  const handleHeartClick = async () => {
    try {
      if (userInfo._id !== undefined) {
        setIsLiked(!isLiked); // Toggle the like state
        await axios.put(`/posts/${post._id}/like`, {
          userId: userInfo._id,
        });
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

  console.log("image", post.images[0]);

  return (
    <div>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <div key={post._id} className="wd--search-content--elements-element">
          <div className="wd--search-content--elements-element-image">
            <FaHeart
              onClick={handleHeartClick}
              style={{ color: isLiked ? "red" : "black" }}
              className="wd--search-content--elements-element-image--like-icon"
            />
            <img
              src={post.images[0]}
              alt={post.brand + " " + post.model + " " + post.year}
            />
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
      )}
    </div>
  );
};

export default FilterElement;
