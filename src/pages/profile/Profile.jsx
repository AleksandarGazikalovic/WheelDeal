import React, { useEffect, useState } from "react";
import "./profile.css";
import { ProfileDesktop, ProfileMobile } from "../";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setCreatedNewPost,
  setCreatedNewVehicle,
} from "../../redux/notificationsSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { createdNewPost, createdNewVehicle, deletedPost } = useSelector(
    (state) => state.notifications
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Clean up event listener
  }, []);

  useEffect(() => {
    const showNewPostToast = async () => {
      if (createdNewPost.status != null) {
        if (createdNewPost.status === "success") {
          toast.success(createdNewPost.message, {
            autoClose: 5000,
          });
        }
        if (createdNewPost.status === "error") {
          toast.error(createdNewPost.message, {
            autoClose: 5000,
          });
        }
      }
    };
    showNewPostToast();
    dispatch(setCreatedNewPost({ status: null, message: null }));
  }, [createdNewPost.status]);

  useEffect(() => {
    const showNewVehicleToast = async () => {
      if (createdNewVehicle.status != null) {
        if (createdNewVehicle.status === "success") {
          toast.success(createdNewVehicle.message, {
            autoClose: 5000,
          });
        }
        if (createdNewVehicle.status === "error") {
          toast.error(createdNewVehicle.message, {
            autoClose: 5000,
          });
        }
      }
    };
    showNewVehicleToast();
    dispatch(setCreatedNewVehicle({ status: null, message: null }));
  }, [createdNewVehicle.status]);

  useEffect(() => {
    const showDeletedPostToast = async () => {
      if (deletedPost.status != null) {
        if (deletedPost.status === "success") {
          toast.success(deletedPost.message, {
            autoClose: 5000,
          });
        }
        if (deletedPost.status === "error") {
          toast.error(deletedPost.message, {
            autoClose: 5000,
          });
        }
      }
    };
    showDeletedPostToast();
    dispatch(setCreatedNewVehicle({ status: null, message: null }));
  }, [deletedPost.status]);

  return <>{isMobile ? <ProfileMobile /> : <ProfileDesktop />}</>;
};

export default Profile;
