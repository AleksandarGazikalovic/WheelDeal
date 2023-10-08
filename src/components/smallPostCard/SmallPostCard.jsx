import React from "react";
import "./smallPostCard.css";

const SmallPostCard = ({ post }) => {
  const options = { month: "short", day: "numeric" };
  const fromDate = new Date(post.from).toLocaleDateString(undefined, options);
  const toDate = new Date(post.to).toLocaleDateString(undefined, options);
  return (
    <div className="wd-profile--liked-posts-post">
      <div className="wd-profile--liked-posts-post-image">
        <img src={post.images[0]} alt="post" />
      </div>
      <div className="wd-profile--liked-posts-post-text">
        <p className="wd-profile--liked-posts-post-text-model">
          {post.brand} {post.model} {post.year}
        </p>
        <p className="wd-profile--liked-posts-post-text-date">
          {fromDate} - {toDate}
        </p>
        <p className="wd-profile--liked-posts-post-text-price">
          {post.price}€ / dan
        </p>
      </div>
    </div>
  );
};

export default SmallPostCard;
