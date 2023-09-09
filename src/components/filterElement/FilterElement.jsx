import React from "react";
import "./filterElement.css";
import axios from "axios";
import noAvatar from "../../assets/noAvatar.png";
import { AiFillStar } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const FilterElement = ({ post, isLoading }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const fromDate = new Date(post.from);
  const toDate = new Date(post.to);

  const options = { month: "short", day: "numeric" };
  const formattedFromDate = fromDate.toLocaleDateString(undefined, options);
  const formattedToDate = toDate.toLocaleDateString(undefined, options);

  const handleHeartClick = async () => {
    try {
      setIsLiked(!isLiked); // Toggle the like state
      console.log("post._id", user._id);
      await axios.put(`/posts/${post._id}/like`, {
        userId: user._id,
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch the user data
        const res = await axios.get(`/users/${post.userId}`);
        const userData = res.data;
        setUser(userData);

        // Check if the post ID is in the likedPosts array
        if (userData.likedPosts.includes(post._id)) {
          setIsLiked(true);
          console.log("liked");
        }
      } catch (error) {}
    };

    fetchPosts();
  }, []);

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
            <img src={noAvatar} alt={post.model + " " + post.year} />
          </div>
          <div className="wd--search-content--elements-element-text">
            <div className="wd--search-content--elements-element-text--left">
              <p className="wd--search-content--elements-element-text--left-model">
                {post.model + " " + post.year}
              </p>
              <p className="wd--search-content--elements-element-text--left-location">
                {post.location}
              </p>
              <p className="wd--search-content--elements-element-text--left-date">
                {formattedFromDate + "-" + formattedToDate}
              </p>
              <p className="wd--search-content--elements-element-text--left-price">
                {post.price} / dan
              </p>
            </div>
            <div className="wd--search-content--elements-element-text--right">
              <div className="wd--search-content--elements-element-text--right-profile">
                <img src={user.img || noAvatar} alt="" />
              </div>
              <div className="wd--search-content--elements-element-text--right-rating">
                {} <AiFillStar />
              </div>
            </div>
            {/* <h3>{image.message.split("/")[4]}</h3> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterElement;
