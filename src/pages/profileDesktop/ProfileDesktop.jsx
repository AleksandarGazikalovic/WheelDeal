import React, { useEffect } from "react";
import "./profileDesktop.css";
import { GoHome, GoPlus } from "react-icons/go";
import Logo from "../../assets/logoDark.png";
import { useSelector } from "react-redux";
import {
  ButtonPrimary,
  PostElement,
  ProfileInfo,
  ProfileInfoEdit,
  ProfileNavbar,
  ProfileStatistics,
  SmallVehicleCard,
  ProfileNotification,
} from "../../components";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCar } from "react-icons/ai";
import { IoStatsChartOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import Loading from "../../components/loading/Loading";
import { IoIosArrowForward } from "react-icons/io";
import Sidebar from "../../components/sidebar/Sidebar";
import { API_ENDPOINT } from "..";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileDesktop = () => {
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const [likedPosts, setLikedPosts] = useState([]);
  const [userVehicles, setUserVehicles] = useState([]);
  const [showProfileInfoEdit, setShowProfileInfoEdit] = useState(false);
  const [profileInfoEditMessage, setProfileInfoEditMessage] = useState({
    status: null,
    message: null,
  });

  useEffect(() => {
    if (userInfo._id === undefined) {
      return;
    }
    const fetchLikedPosts = async () => {
      try {
        const res = await axios.get(
          API_ENDPOINT + `/posts/liked/${userInfo._id}`
        );
        setLikedPosts(res.data);
      } catch (error) {
        console.log("Error in fetching liked posts: " + error);
      }
    };
    const fetchUserVehicles = async () => {
      try {
        const res = await axios.get(
          API_ENDPOINT + `/vehicles/profile/${userInfo._id}`
        );
        setUserVehicles(res.data);
      } catch (error) {
        console.log("Error in fetching users posts: " + error);
      }
    };
    fetchLikedPosts();
    fetchUserVehicles();
  }, [userInfo._id]);

  useEffect(() => {
    const showToast = async () => {
      if (profileInfoEditMessage.status === "success") {
        toast.success(profileInfoEditMessage.message, {
          autoClose: 5000,
        });
      }
      if (profileInfoEditMessage.status === "error") {
        toast.error(profileInfoEditMessage.message, {
          autoClose: 5000,
        });
      }
      setProfileInfoEditMessage({ status: null, message: null });
    };
    showToast();
  }, [profileInfoEditMessage.message]);

  return (
    <div className="wd-profile">
      <div className="wd-profile-wrapper">
        <Sidebar />
        <div className="wd-profile--main">
          <ProfileNavbar />
          <ProfileInfo setShowProfileInfoEdit={setShowProfileInfoEdit} />
          <ProfileStatistics />
          {/* <ProfileNotification /> */}
          <div className="wd-profile--your-vehicles-wrapper" id="style-7">
            <div className="wd-profile--your-vehicles">
              <p className="wd-profile--your-vehicles-title">Your vehicles</p>
              {userVehicles.length > 0 ? (
                userVehicles.map((vehicle) => (
                  <SmallVehicleCard key={vehicle._id} vehicle={vehicle} />
                ))
              ) : (
                <>
                  <p className="wd-profile--your-vehicles-no-vehicles">
                    You have no vehicles
                  </p>
                  <Link to={"/add-vehicle"}>
                    <ButtonPrimary md>Add vehicle</ButtonPrimary>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="wd-profile--liked-posts-wrapper" id="style-7">
            <p className="wd-profile--liked-posts-title">Liked posts</p>
            <div className="wd-profile--liked-posts">
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                  <PostElement key={post._id} post={post} />
                ))
              ) : (
                <>
                  <p className="wd-profile--liked-posts-no-posts">
                    You have no liked posts
                  </p>
                  <Link
                    to={"/search-options"}
                    className="wd-profile--liked-posts-no-posts-offer"
                  >
                    <p>Check what our hosts have to offer</p>
                    <IoIosArrowForward size={20} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {pending && <Loading />}
      {showProfileInfoEdit && (
        <ProfileInfoEdit
          setShowProfileInfoEdit={setShowProfileInfoEdit}
          setProfileInfoEditMessage={setProfileInfoEditMessage}
        />
      )}
    </div>
  );
};

export default ProfileDesktop;
