import React from "react";
import "./profile.css";
import { RiAccountCircleFill } from "react-icons/ri";
import logo from "../../assets/Logo2.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FilterElement, Footer } from "../../components";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AiFillCamera } from "react-icons/ai";
import { updateProfileImage, updateUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [likedPosts, setLikedPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTopbar, setActiveTopbar] = useState("yourPosts");
  const [activeSidebar, setActiveSidebar] = useState("profileInfo");
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await axios.get(`posts/profile/${user._id}`);
      setUserPosts(res.data);
    };
    const fetchLikedPosts = async () => {
      const res = await axios.get(`posts/liked/${user._id}`);
      setLikedPosts(res.data);
    };
    fetchUserPosts();
    fetchLikedPosts();
  }, [user]);

  const onSelectFile = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();

    formData.append(`image`, selectedFile);

    const imageUrl = URL.createObjectURL(selectedFile);

    setProfileImage(imageUrl);

    handleUserChange("profileImage", formData.getAll("image")[0]);

    event.target.value = "";
  };

  useEffect(() => {
    setUserData(user);
  }, []);

  console.log(userData);

  const handleUserChange = (name, value) => {
    setShowSaveBtn(true);
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateProfileImage(userData));
      setShowSaveBtn(false);
      // If the update is successful, refresh the page
      //window.location.reload();
    } catch (error) {
      // If there is an error, you can handle it here
      console.error("Error updating user:", error);
      // You can also set a state variable to store and display the error message
      // For example: setError(error.message);
    }
  };

  return (
    <div className="gradient_bg2">
      <div className="wd--profile-navbar">
        <div className="wd--profile-navbar-links">
          <div className="wd--profile-navbar-links-logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="wd--profile-navbar-sign">
          <Link to="/profile">
            {user.profileImage ? (
              <div className="wd--profile-navbar-sign--account">
                <img src={user.profileImage} alt="" />
              </div>
            ) : (
              <RiAccountCircleFill color="#5e5e5e" size="50" />
            )}
          </Link>
        </div>
      </div>
      <div className="wd--profile-page">
        <div className="wd--profile-page--sidebar">
          <div
            className={`wd--profile-page--sidebar--profile-info ${
              activeSidebar === "profileInfo" ? "active-sidebar" : ""
            }`}
            onClick={() => setActiveSidebar("profileInfo")}
          >
            Profile Info
          </div>
          <div
            className={`wd--profile-page--sidebar--posts ${
              activeSidebar === "posts" ? "active-sidebar" : ""
            }`}
            onClick={() => setActiveSidebar("posts")}
          >
            Posts
          </div>
          <div
            className={`wd--profile-page--sidebar--settings ${
              activeSidebar === "settings" ? "active-sidebar" : ""
            }`}
            onClick={() => setActiveSidebar("settings")}
          >
            Settings
          </div>
        </div>
        <div className="wd--profile-page--container">
          {activeSidebar === "profileInfo" ? (
            <div className="wd--profile-page--container--profile-info">
              <div className="wd--profile-page--container--profile-info--image">
                {profileImage ? (
                  <img src={profileImage} alt="" />
                ) : user.profileImage ? (
                  <img src={user.profileImage} alt="" />
                ) : (
                  <RiAccountCircleFill color="#5e5e5e" size="200" />
                )}
                <div className="wd--profile-page--container--profile-info--image-upload">
                  <label>
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/png , image/jpeg, image/webp"
                      onChange={onSelectFile}
                    />
                    <AiFillCamera size="40" />
                  </label>
                </div>
              </div>
              <div className="wd--profile-page--container--profile-info--wrapper">
                <div className="wd--profile-page--container--profile-info--label">
                  <label>Full Name:</label>
                  <label>Email:</label>
                  <label>Phone Number:</label>
                  <label>Location:</label>
                </div>
                <div className="wd--profile-page--container--profile-info--text">
                  <label>{user.name + " " + user.surname}</label>
                  <label>{user.email}</label>
                  <label>{user.phone}</label>
                  <label>{user.city}</label>
                </div>
              </div>
              {showSaveBtn && (
                <button
                  className="wd--profile-page--container--profile-info--save"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              )}
            </div>
          ) : null}
          {activeSidebar === "settings" ? (
            <div className="wd--profile-page--container--settings">
              <div className="wd--profile-page--container--settings--title">
                Settings
              </div>

              <div className="wd--profile-page--container--settings--form--submit">
                <button>Save Changes</button>
              </div>
            </div>
          ) : null}
          {activeSidebar === "posts" ? (
            <div className="wd--profile-page--container--posts">
              <div className="wd--profile-page--topbar">
                <label
                  className={`${
                    activeTopbar === "yourPosts" ? "active-topbar" : ""
                  }`}
                  onClick={() => setActiveTopbar("yourPosts")}
                >
                  Your Posts
                </label>
                <label
                  className={`${
                    activeTopbar === "likedPosts" ? "active-topbar" : ""
                  }`}
                  onClick={() => setActiveTopbar("likedPosts")}
                >
                  Liked Posts
                </label>
              </div>
              <div
                id="style-8"
                className="wd--profile-page--container--your-posts"
              >
                {userPosts.length === 0 && activeTopbar === "yourPosts" ? (
                  <div className="wd--profile-page--container--your-posts--empty">
                    <h1>You have no posts yet</h1>
                  </div>
                ) : null}
                {likedPosts.length === 0 && activeTopbar === "likedPosts" ? (
                  <div className="wd--profile-page--container--your-posts--empty">
                    <h1>You have no liked posts yet</h1>
                  </div>
                ) : null}
                {activeTopbar === "yourPosts" &&
                  userPosts !== 0 &&
                  userPosts.map((p) => <FilterElement post={p} key={p._id} />)}
                {activeTopbar === "likedPosts" &&
                  likedPosts !== 0 &&
                  likedPosts.map((p) => <FilterElement post={p} key={p._id} />)}
              </div>
            </div>
          ) : null}
        </div>
        <div className="wave3">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill3"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill3"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill3"
            ></path>
          </svg>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
