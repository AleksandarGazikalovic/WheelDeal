import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./comments.css";
import { formatDistanceToNow } from "date-fns";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const Comments = ({ user_id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get( API_ENDPOINT + `/comments/${user_id}`);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [user_id]);

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: 500,
        overflow: "auto",
        marginBottom: "2rem",
      }}
    >
      {comments.length !== 0 ? (
        comments.map((comment) => (
          <React.Fragment key={comment._id}>
            <ListItem alignItems="flex-start">
              <Box
                sx={{
                  minWidth: "100px",
                }}
              >
                <ListItemAvatar
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: comment.author.profileImage
                        ? ""
                        : "#003049",
                      width: "3rem",
                      height: "3rem",
                    }}
                    src={comment.author.profileImage}
                    alt={comment.author.name + " " + comment.author.surname}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.author.name}
                  className="wd--comment-name"
                  sx={{ marginBottom: "0rem", textAlign: "center" }}
                />
                <ListItemText
                  sx={{ marginTop: "0rem", textAlign: "center" }}
                  primary={comment.author.surname}
                  secondary={formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                  className="wd--comment-name"
                />
              </Box>
              <Box className="wd--comment-content">
                <Rating
                  name="read-only"
                  value={comment.rating}
                  precision={0.5}
                  size="medium"
                  readOnly
                />
                <ListItemText
                  primary={comment.subject}
                  secondary={comment.content}
                />
              </Box>
            </ListItem>
            <Divider
              variant="inset"
              component="li"
              sx={{ marginRight: "72px" }}
            />
          </React.Fragment>
        ))
      ) : (
        <ListItem alignItems="flex-start">
          <ListItemText primary={"No comments yet"} />
        </ListItem>
      )}
    </List>
  );
};

export default Comments;
