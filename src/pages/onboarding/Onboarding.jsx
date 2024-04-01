import React, { useCallback, useState } from "react";
import { CustomButton, MuiPhone, Navbar } from "../../components";
import {
  Box,
  Collapse,
  Divider,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./onboarding.css";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import "react-international-phone/style.css";
import { setUser, updateUser } from "../../redux/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import {
  setDriverLicense,
  setIDCard,
  setVehicleInsurance,
  setVehicleRegistration,
  uploadDocuments,
} from "../../redux/documentSlice";
import { FaCircleCheck } from "react-icons/fa6";

const Onboarding = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [phone, setPhone] = useState("");
  const [documents, pending, error] = useSelector((state) => [
    state.documents.documents,
    state.documents.pending,
  ]);
  const [driverLicense, vehicleRegistration, vehicleInsurance, IDCard] =
    useSelector((state) => [
      state.documents.driverLicense,
      state.documents.vehicleRegistration,
      state.documents.vehicleInsurance,
      state.documents.idCard,
    ]);

  const inputFields = [
    {
      id: "drivingLicense",
      label: "Driving License",
      action: setDriverLicense,
      image: driverLicense,
    },
    {
      id: "vehicleRegistration",
      label: "Vehicle Registration",
      action: setVehicleRegistration,
      image: vehicleRegistration,
    },
    {
      id: "vehicleInsurance",
      label: "Vehicle Insurance",
      action: setVehicleInsurance,
      image: vehicleInsurance,
    },
    {
      id: "idCard",
      label: "ID Card",
      action: setIDCard,
      image: IDCard,
    },
  ];

  const dispatch = useDispatch();
  // Add state to manage the open status of each ListItem
  const [open, setOpen] = useState({
    email: false,
    phone: false,
    license: false,
    payment: false,
  });

  const handleImageChange = (e, actionCreator) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          actionCreator({
            file: reader.result,
            status: "idle",
            error: null,
            size: img.size,
            name: img.name,
          })
        );
      };
      reader.readAsDataURL(img);
    }
  };

  const handleImageUpload = (field) => {
    dispatch(uploadDocuments(field.image.file)).then((res) => {
      console.log(res);
      if (res.error) {
        toast.error("Failed to upload document");
      } else {
        toast.success("Document uploaded successfully");
      }
    });
  };

  const toggleListItem = (item) => {
    setOpen((prevOpen) => ({ ...prevOpen, [item]: !prevOpen[item] }));
  };

  const onPhoneChange = (phone) => {
    setPhone(phone);
  };
  const submitPhone = () => {
    try {
      dispatch(
        updateUser({
          ...userInfo,
          phone: phone,
        })
      );
      // Assuming dispatch success since there's no async operation
      toast.success("Phone number updated successfully");
      setOpen((prevOpen) => ({ ...prevOpen, phone: false }));
      setOpen((prevOpen) => ({ ...prevOpen, license: true }));
    } catch (err) {
      console.log(err);
      toast.error("Failed to update phone number");
    }
  };

  return (
    <>
      <Navbar />
      <div className="wd-onboarding--wrapper">
        <h1>Get approved to drive</h1>
        <h4>
          Since this is your first trip, you’ll need to provide us with some
          information before you can check out.
        </h4>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "70%",
            height: "100%",
            margin: "0 auto",
          }}
        >
          <Divider
            variant="inset"
            component="li"
            sx={{ width: "100%", margin: "0 auto" }}
          />
          {/* Email verification list item */}
          <ListItemButton
            sx={{
              height: userInfo.isAccountVerified ? "50px" : "70px",
              transition: "height 0.3s",
            }}
            onClick={() => toggleListItem("email")}
          >
            <ListItemText
              primary="Verify your email"
              className="wd-onboarding--list-item-title"
            />
            <ListItemIcon>
              <IoCheckmarkDoneCircle
                size={35}
                color={userInfo.isAccountVerified ? "green" : "grey"}
              />
            </ListItemIcon>
          </ListItemButton>
          <Collapse in={open.email} timeout="auto" unmountOnExit>
            <Box className="wd-onboarding--list-item-box">
              <ListItemText secondary="Please verify your email first so we can make sure we can contact you." />
            </Box>
          </Collapse>
          <Divider
            variant="inset"
            component="li"
            sx={{ width: "100%", margin: "0 auto" }}
          />
          {/* Mobile number list item */}
          <ListItemButton
            sx={{
              height: userInfo.phone ? "50px" : "70px",
              transition: "height 0.3s",
            }}
            onClick={() => toggleListItem("phone")}
          >
            <ListItemText
              primary="Mobile number"
              className="wd-onboarding--list-item-title"
            />
            <ListItemIcon>
              <IoCheckmarkDoneCircle
                size={35}
                color={userInfo.phone ? "green" : "grey"}
              />
            </ListItemIcon>
          </ListItemButton>
          <Collapse in={open.phone} timeout="auto" unmountOnExit>
            <Box className="wd-onboarding--list-item-box">
              <ListItemText secondary="Please provide a valid phone number so we can contact you if needed." />
              <Box>
                <MuiPhone value={phone} onChange={onPhoneChange} />
                <CustomButton text="Continue" action={submitPhone} />
              </Box>
            </Box>
          </Collapse>
          <Divider
            variant="inset"
            component="li"
            sx={{ width: "100%", margin: "0 auto" }}
          />
          <ListItemButton
            sx={{
              height: userInfo.isLicenceVerified ? "50px" : "70px",
              transition: "height 0.3s",
            }}
            onClick={() => toggleListItem("license")}
          >
            <ListItemText
              primary="Driver's license"
              className="wd-onboarding--list-item-title"
            />
            <ListItemIcon>
              <IoCheckmarkDoneCircle
                size={35}
                color={userInfo.isLicenceVerified ? "green" : "grey"}
              />
            </ListItemIcon>
          </ListItemButton>
          <Collapse in={open.license} timeout="auto" unmountOnExit>
            <Box className="wd-onboarding--list-item-box">
              <ListItemText secondary="Please provide a valid driver's license so we can verify your identity." />
              <TableContainer sx={{ width: 800 }} component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#e5e5e5" }}>
                      <TableCell
                        sx={{ fontWeight: 600, textTransform: "uppercase" }}
                        align="center"
                      >
                        Preview
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, textTransform: "uppercase" }}
                        align="center"
                      >
                        Document name
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, textTransform: "uppercase" }}
                        align="center"
                      >
                        File name
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, textTransform: "uppercase" }}
                        align="center"
                      >
                        Size
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, textTransform: "uppercase" }}
                        align="center"
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inputFields.map((field) => (
                      <TableRow
                        key={field.id}
                        sx={{
                          height: "100px",
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {field.image.file ? (
                            <img
                              src={field.image.file}
                              alt="licence card"
                              width="100%"
                              height="100%"
                            />
                          ) : (
                            <ListItemButton
                              sx={{
                                height: "100%",
                                width: "100%",
                                flexDirection: "column",
                                border: "2px dashed #b1b1b1",
                                borderRadius: "5px",
                                backgroundColor: "#e5e5e5a3",
                                cursor: "pointer",
                              }}
                              component="label"
                            >
                              <ListItemText
                                className="wd-onboarding--list-item-title"
                                sx={{ textAlign: "center" }}
                                primary={field.label}
                              />
                              <input
                                type="file"
                                hidden
                                onChange={(e) =>
                                  handleImageChange(e, field.action)
                                }
                              />
                            </ListItemButton>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {field.image.file ? field.label : ""}
                        </TableCell>
                        <TableCell align="center">
                          {field.image.file ? field.image.name : ""}
                        </TableCell>
                        <TableCell align="center">
                          {field.image.file
                            ? (field.image.size / 1000).toFixed(0) + "KB"
                            : ""}
                        </TableCell>
                        <TableCell align="center">
                          {field.image.file ? (
                            true ? (
                              <CustomButton
                                text="Upload"
                                action={() => handleImageUpload(field)}
                              />
                            ) : pending ? (
                              <CircularProgress size={20} />
                            ) : (
                              <FaCircleCheck size={20} color="green" />
                            )
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <CustomButton text="Continue" disabled={true} />
            </Box>
          </Collapse>
          <Divider
            variant="inset"
            component="li"
            sx={{ width: "100%", margin: "0 auto" }}
          />
          <ListItemButton
            sx={{
              height: userInfo.paymentMethod ? "50px" : "70px",
              transition: "height 0.3s",
            }}
            onClick={() => toggleListItem("payment")}
          >
            <ListItemText
              primary="Payment method"
              className="wd-onboarding--list-item-title"
            />
            <ListItemIcon>
              <IoCheckmarkDoneCircle
                size={35}
                color={userInfo.paymentMethod ? "green" : "grey"}
              />
            </ListItemIcon>
          </ListItemButton>
          <Collapse in={open.payment} timeout="auto" unmountOnExit>
            <Box className="wd-onboarding--list-item-box">
              <ListItemText secondary="Please provide a valid payment method so we can charge you for the trip." />
            </Box>
          </Collapse>
          <Divider
            variant="inset"
            component="li"
            sx={{ width: "100%", margin: "0 auto" }}
          />
        </List>
        <CustomButton text="Continue" disabled={true} />
      </div>
    </>
  );
};

export default Onboarding;
