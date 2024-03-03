import React from "react";
import "./profileInfoEdit.css";
import { useSelector } from "react-redux";
import { IoLogoTwitter, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io5";
import { RiCloseLine, RiAccountCircleFill } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProfileImage, updateUser } from "../../redux/userSlice";
import { Avatar } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const ProfileInfoEdit = ({
  setShowProfileInfoEdit,
  setProfileInfoEditMessage,
}) => {
  const user = useSelector((state) => state.user.userInfo);
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const dispatch = useDispatch();

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
  }, [user]);

  const handleUserChange = (name, value) => {
    setShowSaveBtn(true);
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      if (profileImage !== null) {
        // await dispatch(updateUser(userData));
        await dispatch(updateProfileImage(userData)).then((result) => {
          if (updateProfileImage.fulfilled.match(result)) {
            notifySuccess();
          } else if (updateProfileImage.rejected.match(result)) {
            notifyError();
          }
        });
        setProfileImage(null);
      } else {
        await dispatch(updateUser(userData)).then((result) => {
          if (updateUser.fulfilled.match(result)) {
            notifySuccess();
          } else if (updateUser.rejected.match(result)) {
            notifyError();
          }
        });
      }
      setShowSaveBtn(false);
      setShowProfileInfoEdit(false);
      //window.location.reload();
    } catch (error) {
      // If there is an error, you can handle it here
      console.error("Error updating user:", error);
      // You can also set a state variable to store and display the error message
      // For example: setError(error.message);
    }
  };

  const notifySuccess = () => {
    setProfileInfoEditMessage({
      status: "success",
      message: "Uspešno ste ažurirali podatke.",
    });
  };

  const notifyError = () => {
    setProfileInfoEditMessage({
      status: "error",
      message: "Došlo je do greške prilikom ažuriranja podataka.",
    });
  };

  return (
    <div className="wd-profile--profile-info-edit-wrapper">
      <div className="wd-profile--profile-info-edit slide-top">
        <RiCloseLine
          className="wd-profile--profile-info-edit--close"
          size={40}
          onClick={() => setShowProfileInfoEdit(false)}
        />
        <div className="wd-profile--profile-info-edit--top">
          <div className="wd-profile--profile-info-edit--image">
            {profileImage ? (
              <Avatar
                sx={{
                  width: "inherit",
                  height: "inherit",
                }}
                src={profileImage}
              />
            ) : (
              <Avatar
                sx={{
                  width: "inherit",
                  height: "inherit",
                  backgroundColor: user.profileImage ? "" : "#003049",
                }}
                src={user.profileImage}
                alt={user.firstname + " " + user.lastname}
              />
            )}
            <div className="wd-profile--profile-info-edit--image-upload">
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
          <p className="wd-profile--profile-info-edit--name">
            {user.name} {user.surname}
          </p>
        </div>
        <div className="wd-profile--profile-info-edit--details">
          <div className="wd-profile--profile-info-edit--details-labels">
            <p>Age:</p>
            <p>City:</p>
            <p>Phone:</p>
            <p>Email:</p>
          </div>
          <div className="wd-profile--profile-info-edit--details-values">
            <div className="wd-profile--profile-info-edit--details-div">
              <input
                className="wd-profile--profile-info-edit--details-input"
                name="age"
                onChange={(e) =>
                  handleUserChange(e.target.name, e.target.value)
                }
                type="number"
                placeholder={user.age || "Age"}
              />
              <span className="wd-profile--profile-info-edit--details-border"></span>
            </div>
            <div className="wd-profile--profile-info-edit--details-div">
              <input
                className="wd-profile--profile-info-edit--details-input"
                name="city"
                onChange={(e) =>
                  handleUserChange(e.target.name, e.target.value)
                }
                type="text"
                placeholder={user.city || "City"}
              />
              <span className="wd-profile--profile-info-edit--details-border"></span>
            </div>
            <div className="wd-profile--profile-info-edit--details-div">
              <input
                className="wd-profile--profile-info-edit--details-input"
                name="phone"
                onChange={(e) =>
                  handleUserChange(e.target.name, e.target.value)
                }
                type="number"
                placeholder={user.phone || "Phone"}
              />
              <span className="wd-profile--profile-info-edit--details-border"></span>
            </div>
            <p>{user.email}</p>
            {/* <div className="wd-profile--profile-info-edit--details-div">
              <input
                className="wd-profile--profile-info-edit--details-input"
                name="email"
                onChange={(e) =>
                  handleUserChange(e.target.name, e.target.value)
                }
                type="email"
                placeholder={user.email || "Email"}
              />
              <span className="wd-profile--profile-info-edit--details-border"></span>
            </div> */}
          </div>
        </div>
        <div className="wd-profile--profile-info-edit--bottom">
          <div className="wd-profile--profile-info-edit--details-socials">
            <IoLogoTwitter size={20} />
            <IoLogoFacebook size={20} />
            <IoLogoLinkedin size={20} />
          </div>
          <div className="wd-profile--profile-info-edit--details-socials-input">
            <div className="wd-profile--profile-info-edit--details-div">
              <input
                className="wd-profile--profile-info-edit--details-input"
                name="twitter"
                onChange={(e) =>
                  handleUserChange(e.target.name, e.target.value)
                }
                type="text"
                placeholder={user.twitter || "Twitter"}
              />
              <span className="wd-profile--profile-info-edit--details-border"></span>
            </div>
            <div className="wd-profile--profile-info-edit--details-div">
              <input
                className="wd-profile--profile-info-edit--details-input"
                name="facebook"
                onChange={(e) =>
                  handleUserChange(e.target.name, e.target.value)
                }
                type="text"
                placeholder={user.facebook || "Facebook"}
              />
              <span className="wd-profile--profile-info-edit--details-border"></span>
            </div>
            <div className="wd-profile--profile-info-edit--details-div">
              <input
                className="wd-profile--profile-info-edit--details-input"
                name="linkedin"
                onChange={(e) =>
                  handleUserChange(e.target.name, e.target.value)
                }
                type="text"
                placeholder={user.linkedin || "Linkedin"}
              />
              <span className="wd-profile--profile-info-edit--details-border"></span>
            </div>
          </div>
        </div>
        {
          <button
            className="wd-profile--profile-info-edit--save"
            onClick={() => handleUpdate()}
            style={{ visibility: showSaveBtn ? "visible" : "hidden" }}
          >
            Save
          </button>
        }
      </div>
    </div>
  );
};

export default ProfileInfoEdit;
