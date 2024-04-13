import React from "react";

import {
  ListItemButton,
  ListItemText,
  TableCell,
  TableRow,
} from "@mui/material";
import { useAddDocumentMutation } from "../../redux/documentSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCircleCheck } from "react-icons/fa6";
import CustomButton from "../customButton/CustomButton";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OnboardingTableRow = ({ field }) => {
  const { userInfo } = useSelector((state) => state.user);
  // const [vehicleInsurance, setVehicleInsurance] = useState({});
  const { vehicleId } = useParams();
  const [addDocument, { isLoading, isSuccess, reset }] =
    useAddDocumentMutation();
  const renderStatus = (field) => {
    if (field.existingDocument?.image) {
      return <FaCircleCheck color="green" size={30} />;
    }
    if (field.state.status === "uploaded") {
      if (isLoading) {
        return <CircularProgress size={20} />;
      } else if (isSuccess) {
        return <FaCircleCheck color="green" size={30} />;
      } else {
        return (
          <CustomButton text="Upload" action={() => handleImageUpload(field)} />
        );
      }
    }
  };

  const handleImageChange = (e, actionCreator) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const formData = new FormData();
      formData.append("image", img);
      actionCreator({
        userId: userInfo._id,
        vehicleId: vehicleId,
        image: formData.getAll("image")[0],
        imageUrl: URL.createObjectURL(img),
        status: "uploaded",
      });
    }
  };

  const handleImageUpload = async (field) => {
    const formData = new FormData();
    formData.append("userId", userInfo._id);
    formData.append("vehicleId", vehicleId);
    formData.append("image", field.state.image);
    formData.append("type", field.id);
    await addDocument({ formData });
    reset();
  };
  return (
    <TableRow
      key={field.id}
      sx={{
        height: "100px",
      }}
    >
      <TableCell align="center" component="th" scope="row">
        {field.state.image || field.existingDocument?.image ? (
          <img
            src={field.state.imageUrl || field.existingDocument?.image}
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
              accept="image/png , image/jpeg, image/webp"
              onChange={(e) => handleImageChange(e, field.action)}
            />
          </ListItemButton>
        )}
      </TableCell>
      <TableCell align="center">
        {field.state.image || field.existingDocument?.image ? field.label : ""}
      </TableCell>
      <TableCell align="center">{renderStatus(field)}</TableCell>
    </TableRow>
  );
};

export default OnboardingTableRow;
