import React, { useEffect, useState } from "react";
import "./myPost.css";
import {
  Loading,
  CustomButton,
  ProfileNavbar,
  Sidebar,
  LocationAutocomplete,
  GoogleMaps,
  Navbar,
} from "../../components";
import { API_ENDPOINT } from "..";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import carModelsArray from "../../models/car-models.json";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../redux/postSlice";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { DateRange } from "react-date-range";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [newPost, setNewPost] = useState({});
  const [images, setImages] = useState([]);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { pending, postInfo, error } = useSelector((state) => state.post);
  const [postInfoEditMessage, setPostInfoEditMessage] = useState({
    status: null,
    message: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the post data
        const postResponse = await axios.get(API_ENDPOINT + `/posts/${postId}`);
        setPost(postResponse.data);
        setImages(postResponse.data.images);
        setState([
          {
            startDate: new Date(postResponse.data.from),
            endDate: new Date(postResponse.data.to),
            key: "selection",
          },
        ]);
        setLoading(false);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching data:", error);
        // navigate to component that shows that this post is no longer available (and leave a link to navigate back to search options)
        // should be implemented in case that user saved a link in browser and after a while tries to access it, but user deleted a post in meantime
        navigate("/not-found");
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    const showToast = async () => {
      if (postInfoEditMessage.status === "success") {
        toast.success(postInfoEditMessage.message, {
          autoClose: 5000,
        });
      }
      if (postInfoEditMessage.status === "error") {
        toast.error(postInfoEditMessage.message, {
          autoClose: 5000,
        });
      }
      setPostInfoEditMessage({ status: null, message: null });
    };
    showToast();
  }, [postInfoEditMessage.message]);

  const handleNextImage = () => {
    const newImages = [...images];
    const firstImage = newImages.shift();
    newImages.push(firstImage);
    setImages(newImages);
  };

  const handlePreviousImage = () => {
    const newImages = [...images];
    const lastImage = newImages.pop();
    newImages.unshift(lastImage);
    setImages(newImages);
  };

  const validateUpdatedPost = (post) => {
    if (
      post.brand === "" ||
      post.carModel === "" ||
      post.year === "" ||
      post.mileage === "" ||
      post.transmission === "" ||
      post.fuel === "" ||
      post.drive === "" ||
      post.engine === "" ||
      post.price === "" ||
      post.from === "" ||
      post.to === "" ||
      post.location === ""
    ) {
      return true;
    }

    return false;
  };

  const handleEdit = () => {
    setEdit(!edit);
    setDisableUpdate(true);
  };

  const handleUpdate = async () => {
    try {
      dispatch(
        updatePost({
          ...newPost,
          _id: postId,
          userId: post.userId,
        })
      ).then((result) => {
        if (updatePost.fulfilled.match(result)) {
          setEdit(!edit);
          setDisableUpdate(true);
          setPostInfoEditMessage({
            status: "success",
            message: "Uspešno ste ažurirali Vaš oglas.",
          });
        } else if (updatePost.rejected.match(result)) {
          setPostInfoEditMessage({
            status: "error",
            message: "Došlo je do greške prilikom ažuriranja Vašeg oglasa.",
          });
        }
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deletePost({ _id: postId, userId: post.userId })).then(
        (result) => {
          if (deletePost.fulfilled.match(result)) {
            navigate("/profile");
          } else {
            console.log(result.payload.message);
          }
        }
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleChange = (name, value) => {
    if (name === "brand") {
      setPost({
        ...post,
        [name]: value,
        carModel: "",
      });
      setNewPost({
        ...newPost,
        [name]: value,
        carModel: "",
      });
    } else {
      setPost({ ...post, [name]: value });
      setNewPost({ ...newPost, [name]: value });
    }
  };

  useEffect(() => {
    if (edit) {
      setDisableUpdate(validateUpdatedPost(post));
    }
  }, [post]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const formData = new FormData();

    const selectedFilesArray = Array.from(selectedFiles);

    selectedFilesArray.forEach((file, index) => {
      formData.append(`images[]`, file); // You can use a unique name for each file
    });

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImages(imagesArray);

    setPost({
      ...post,
      images: formData.getAll("images[]"),
    });

    setNewPost({
      ...newPost,
      images: formData.getAll("images[]"),
    });

    event.target.value = "";
  };

  const handleLocationSelect = (selectedLocation) => {
    setPost({
      ...post,
      location: selectedLocation,
    });

    setNewPost({
      ...newPost,
      location: selectedLocation,
    });
  };

  useEffect(() => {
    const fromDate = state[0].startDate;
    const toDate = state[0].endDate;

    setPost({
      ...post,
      from: fromDate,
      to: toDate,
    });

    setNewPost({
      ...newPost,
      from: fromDate,
      to: toDate,
    });
  }, [state]);

  if (loading || pending) {
    return <Loading />;
  }

  return (
    <div className="wd--my-post--wrapper">
      <Sidebar />
      <div className="wd--my-post--main">
        <div className="wd--my-post--navbar-wrapper">
          <Navbar />
        </div>
        <ProfileNavbar />
        <div className="wd--my-post--content-top">
          <div className="wd--my-post--content--image">
            <RiArrowLeftSLine
              size={30}
              className="wd--my-post--content--image-arrow"
              onClick={handlePreviousImage}
            />
            <button
              disabled={!edit}
              className="wd--my-post--content--upload-photos"
            >
              <label
                style={edit ? { cursor: "pointer" } : { cursor: "not-allowed" }}
              >
                <span>Upload photos</span>
                <MdOutlinePhotoLibrary />
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  disabled={!edit}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
                />
              </label>
            </button>
            <img src={images[0]} alt="car" />
            <RiArrowRightSLine
              size={30}
              className="wd--my-post--content--image-arrow"
              onClick={handleNextImage}
            />
          </div>
          <div className="wd--my-post--content--info">
            <h1>{post.brand + " " + post.carModel + " " + post.year}</h1>
            <div className="wd--my-post--content--info-details">
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Brand"
                value={post.brand}
                name="brand"
                required
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {carModelsArray
                  .sort((a, b) => a.brand.localeCompare(b.brand))
                  .map((item) => (
                    <MenuItem key={item.brand} value={item.brand}>
                      {item.brand}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Model"
                value={post.carModel}
                name="carModel"
                required
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {post.brand !== ""
                  ? carModelsArray.map((item) =>
                      item.brand.toLowerCase() === post.brand.toLowerCase()
                        ? item.models
                            .sort((a, b) => a.localeCompare(b))
                            .map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))
                        : null
                    )
                  : null}
              </TextField>
              <TextField
                size="small"
                disabled={!edit}
                label="Year"
                type="number"
                value={post.year}
                name="year"
                required
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></TextField>
              <TextField
                size="small"
                disabled={!edit}
                label="Mileage"
                type="number"
                value={post.mileage}
                name="mileage"
                required
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></TextField>
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Transmission"
                value={post.transmission}
                name="transmission"
                required
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                <MenuItem value="Manual">Manual</MenuItem>
                <MenuItem value="Automatic">Automatic</MenuItem>
              </TextField>
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Fuel"
                value={post.fuel}
                name="fuel"
                required
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="LNG">Gas (LNG)</MenuItem>
                <MenuItem value="CNG">Methane (CNG)</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </TextField>
              <TextField
                size="small"
                select
                disabled={!edit}
                label="Drive"
                value={post.drive}
                name="drive"
                required
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                <MenuItem value="FWD">FWD</MenuItem>
                <MenuItem value="RWD">RWD</MenuItem>
                <MenuItem value="AWD">AWD</MenuItem>
              </TextField>
              <TextField
                size="small"
                disabled={!edit}
                label="HP"
                type="number"
                value={post.engine}
                name="engine"
                required
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></TextField>
              <FormControl>
                <InputLabel htmlFor="outlined-adornment-price">
                  Price
                </InputLabel>
                <OutlinedInput
                  size="small"
                  disabled={!edit}
                  label="Price"
                  type="number"
                  value={post.price}
                  name="price"
                  required
                  id="outlined-adornment-price"
                  className="wd--my-post--content--info-details-field"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <TextField
                size="small"
                disabled={!edit}
                multiline
                rows={5.9}
                label="Description"
                value={post.description}
                name="description"
                className="wd--my-post--content--info-details-field"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></TextField>
            </div>
          </div>
        </div>
        <div className="wd--my-post--content-bottom">
          <div className="wd--my-post--content--location">
            <LocationAutocomplete
              selectedLocation={post.location}
              onSelect={handleLocationSelect}
              disabled={!edit}
            />
            <div className="wd--my-post--content--location-map">
              <GoogleMaps selectedLocation={post.location} />
            </div>
          </div>
          <div
            className="wd--my-post--content--date"
            style={edit ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              dragSelectionEnabled={true}
              ranges={state}
              style={{
                width: "300px",
              }}
            />
          </div>
        </div>
        <div className="wd--my-post--buttons">
          <CustomButton
            text="Delete"
            action={handleDelete}
            width={"100px"}
            backgroundColor={"#D62828"}
          />
          <div className="wd--my-post--buttons-right">
            <CustomButton
              text="Edit"
              action={handleEdit}
              disabled={edit}
              width={"70px"}
            />
            <CustomButton
              text="Update"
              action={handleUpdate}
              width={"100px"}
              disabled={disableUpdate}
              backgroundColor={"#1fb538"}
              disabledBackgroundColor={"#80c28b"}
              hoverText={
                disableUpdate ? "Please fill all the fields" : "Submit the form"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
