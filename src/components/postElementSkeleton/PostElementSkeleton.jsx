import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./postElementSkeleton.css";

const PostElementSkeleton = ({ isLoaded }) => {
  return (
    !isLoaded && (
      <div className="card-skeleton">
        <div className="card-skeleton__image ">
          <Skeleton height={250} borderRadius={25} />
        </div>
        <div className="card-skeleton__text">
          <div className="card-skeleton__left ">
            <div className="card-skeleton__body--title">
              <Skeleton width={150} />
            </div>
            <div className="card-skeleton__body--location">
              <Skeleton width={100} />
            </div>
            <div className="card-skeleton__body--date">
              <Skeleton width={100} />
            </div>
            <div className="card-skeleton__body--price">
              <Skeleton width={75} />
            </div>
          </div>
          <div className="card-skeleton__right">
            <div className="card-skeleton__body--profile">
              <Skeleton circle={true} height={40} width={40} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PostElementSkeleton;
