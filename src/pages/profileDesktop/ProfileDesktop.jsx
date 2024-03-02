import React, { useEffect } from "react";
import "./profileDesktop.css";
import { GoHome, GoPlus } from "react-icons/go";
import Logo from "../../assets/logoDark.png";
import { useSelector } from "react-redux";
import {
  CustomButton,
  PostElement,
  ProfileInfo,
  ProfileInfoEdit,
  ProfileNavbar,
  ProfileStatistics,
  SmallPostCard,
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
  const [userPosts, setUserPosts] = useState([]);
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
      const res = await axios.get(
        API_ENDPOINT + `/posts/liked/${userInfo._id}`
      );
      setLikedPosts(res.data);
    };
    const fetchUserPosts = async () => {
      const res = await axios.get(
        API_ENDPOINT + `/posts/profile/${userInfo._id}`
      );
      setUserPosts(res.data);
    };
    fetchUserPosts();
    fetchLikedPosts();
  }, [userInfo._id]);

  useEffect(() => {
    const showToast = async () => {
      if (profileInfoEditMessage.status === "success") {
        toast.success(profileInfoEditMessage.message, {
          autoClose: 3000,
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
          <ProfileNotification />
          <div className="wd-profile--your-posts-wrapper" id="style-7">
            <div className="wd-profile--your-posts">
              <p className="wd-profile--your-posts-title">Your posts</p>
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <SmallPostCard key={post._id} post={post} />
                ))
              ) : (
                <>
                  <p className="wd-profile--your-posts-no-posts">
                    You have no posts
                  </p>
                  <Link to={"/add-post"}>
                    <CustomButton
                      className="wd-profile--your-posts-no-posts-button"
                      text={"Add post"}
                    />
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
