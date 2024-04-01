import "./profileMobile.css";
import {
  CustomButton,
  PostElement,
  ProfileInfo,
  ProfileInfoEdit,
  ProfileStatistics,
  TabBar,
} from "../../components";
import { Navbar, SmallPostCard } from "../../components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const ProfileMobile = ({ setConnectionError }) => {
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const [showProfileInfoEdit, setShowProfileInfoEdit] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState(
    <ProfileInfo setShowProfileInfoEdit={setShowProfileInfoEdit} />
  );
  const [profileInfoEditMessage, setProfileInfoEditMessage] = useState({
    status: null,
    message: null,
  });

  const handleTabClick = (tab) => {
    switch (tab) {
      case "info":
        setActiveTab(
          <ProfileInfo setShowProfileInfoEdit={setShowProfileInfoEdit} />
        );
        break;
      case "car":
        setActiveTab(
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
        );
        break;
      case "like":
        setActiveTab(
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
        );
        break;
      case "stats":
        setActiveTab(<ProfileStatistics />);
        break;
      case "settings":
        break;
      default:
        setActiveTab(
          <ProfileInfo setShowProfileInfoEdit={setShowProfileInfoEdit} />
        );
    }
  };

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
        setConnectionError("Greška prilikom učitavanja stranice.");
      }
    };
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          API_ENDPOINT + `/posts/profile/${userInfo._id}`
        );
        setUserPosts(res.data);
      } catch (error) {
        console.log("Error in fetching users posts: " + error);
        setConnectionError("Greška prilikom učitavanja stranice.");
      }
    };
    fetchUserPosts();
    fetchLikedPosts();
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
    <div className="wd-profile2">
      <div className="wd-profile2-wrapper">
        <Navbar />
        {activeTab}
      </div>
      <TabBar onTabClick={handleTabClick} />
      {showProfileInfoEdit && (
        <ProfileInfoEdit
          setShowProfileInfoEdit={setShowProfileInfoEdit}
          setProfileInfoEditMessage={setProfileInfoEditMessage}
        />
      )}
    </div>
  );
};

export default ProfileMobile;
