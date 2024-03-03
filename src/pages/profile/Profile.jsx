import React, { useEffect, useState } from "react";
import "./profile.css";
import { ProfileDesktop, ProfileMobile } from "../";
import { useDispatch, useSelector } from "react-redux";
import { setCreatedNewPost } from "../../redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const [connectionErrorDesktop, setConnectionErrorDesktop] = useState(null);
  const [connectionErrorMobile, setConnectionErrorMobile] = useState(null);
  const [errorRendered, setErrorRendered] = useState(false);
  const { userInfo, pending, createdNewPost, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const showNewPostToast = async () => {
      if (createdNewPost.status != null) {
        if (createdNewPost.status === "success") {
          console.log("HERE 1");
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
    if (
      connectionErrorDesktop != null &&
      connectionErrorDesktop != connectionErrorMobile
    ) {
      toast.error(connectionErrorDesktop, {
        autoClose: 5000,
      });
      setErrorRendered(true);
    }
    if (
      connectionErrorMobile != null &&
      connectionErrorMobile != connectionErrorDesktop
    ) {
      toast.error(connectionErrorMobile, {
        autoClose: 5000,
      });
      setErrorRendered(true);
    }
    // in case both errors got caught at the same time
    if (!errorRendered && connectionErrorDesktop === connectionErrorMobile) {
      toast.error(connectionErrorDesktop, {
        autoClose: 5000,
      });
    }
  }, [connectionErrorDesktop, connectionErrorMobile]);

  return (
    <>
      <ProfileDesktop setConnectionError={setConnectionErrorDesktop} />
      <ProfileMobile setConnectionError={setConnectionErrorMobile} />
    </>
  );
};

export default Profile;
