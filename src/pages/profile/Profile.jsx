import React from "react";
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
  const [connectionErrorDesktop, setConnectionErrorDesktop] = useState(null);
  const [connectionErrorMobile, setConnectionErrorMobile] = useState(null);
  const [errorRendered, setErrorRendered] = useState(false);
  const { createdNewPost, createdNewVehicle } = useSelector(
    (state) => state.notifications
  );

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
      <ProfileDesktop />
      <ProfileMobile />
    </>
  );
};

export default Profile;
