import React, { useState } from "react";
import {
  CustomButton,
  MuiPhone,
  Navbar,
  OnboardingTableRow,
} from "../../components";
import {
  Box,
  Collapse,
  Divider,
  List,
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
import { updateUser } from "../../redux/userSlice";
import { toast } from "react-toastify";
import {
  useFetchDocumentsQuery,
  documentsSelectors,
} from "../../redux/documentSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [idCard, setIdCard] = useState({});
  const [vehicleLicense, setVehicleLicense] = useState({});
  const [registrationExpiry, setRegistrationExpiry] = useState({});
  // const [vehicleInsurance, setVehicleInsurance] = useState({});
  const { vehicleId } = useParams();
  const [phone, setPhone] = useState("");
  useFetchDocumentsQuery(vehicleId);
  const navigate = useNavigate();
  const allDocumentsUploaded = useSelector((state) =>
    documentsSelectors.areAllDocumentsUploaded(state, vehicleId)
  );

  const inputFields = [
    {
      id: "idCard",
      label: "ID Card",
      action: setIdCard,
      state: idCard,
      existingDocument: useSelector((state) =>
        documentsSelectors.selectIdCardForVehicle(state, vehicleId)
      ),
    },
    {
      id: "vehicleLicense",
      label: "Vehicle License",
      action: setVehicleLicense,
      state: vehicleLicense,
      existingDocument: useSelector((state) =>
        documentsSelectors.selectVehicleLicenseForVehicle(state, vehicleId)
      ),
    },
    {
      id: "registrationExpiry",
      label: "Registration Expiry",
      action: setRegistrationExpiry,
      state: registrationExpiry,
      existingDocument: useSelector((state) =>
        documentsSelectors.selectRegistrationExpiryForVehicle(state, vehicleId)
      ),
    },
    // {
    //   id: "vehicleInsurance",
    //   label: "Vehicle Insurance",
    //   action: setVehicleInsurance,
    //   state: vehicleInsurance,
    // },
  ];

  const dispatch = useDispatch();
  // Add state to manage the open status of each ListItem
  const [open, setOpen] = useState({
    email: false,
    phone: false,
    license: false,
    // payment: false,
  });

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

  const handleFinish = () => {
    // Assuming dispatch success since there's no async operation
    if (userInfo.isAccountVerified && userInfo.phone && allDocumentsUploaded) {
      navigate("/profile");
      toast.info(
        "You are all set! You can browse our vehicles until our team validates your documents. 🚗🎉"
      );
    } else {
      toast.warning("Please complete all the steps before finishing.");
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
              <ListItemText secondary="Great news – your email is already verified, and you're good to go! 🎉" />
              <ListItemText secondary="Now, let's complete your vehicle data to get the full experience. 🚀" />
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
                <MuiPhone
                  defaultValue={userInfo.phone}
                  value={phone}
                  onChange={onPhoneChange}
                />
                <CustomButton
                  text="Continue"
                  action={submitPhone}
                  disabled={phone.length < 10 || phone === "" || phone === null}
                />
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
              height: allDocumentsUploaded ? "50px" : "70px",
              transition: "height 0.3s",
            }}
            onClick={() => toggleListItem("license")}
          >
            <ListItemText
              primary="Documents"
              className="wd-onboarding--list-item-title"
            />
            <ListItemIcon>
              <IoCheckmarkDoneCircle
                size={35}
                color={allDocumentsUploaded ? "green" : "grey"}
              />
            </ListItemIcon>
          </ListItemButton>
          <Collapse in={open.license} timeout="auto" unmountOnExit>
            <Box className="wd-onboarding--list-item-box" alignItems={"center"}>
              <ListItemText secondary="Please provide a valid driver's license so we can verify your identity." />
              <TableContainer sx={{ width: "100%" }} component={Paper}>
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
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inputFields.map((field, index) => (
                      <OnboardingTableRow field={field} key={index} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <CustomButton
                text="Continue"
                disabled={!allDocumentsUploaded}
                action={() => {
                  setOpen((prevOpen) => ({ ...prevOpen, license: false }));
                  // setOpen((prevOpen) => ({ ...prevOpen, payment: true }));
                }}
              />
            </Box>
          </Collapse>
          <Divider
            variant="inset"
            component="li"
            sx={{ width: "100%", margin: "0 auto" }}
          />
          {/* <ListItemButton
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
          /> */}
        </List>
        <CustomButton text="Finish" action={() => handleFinish()} />
      </div>
    </>
  );
};

export default Onboarding;
