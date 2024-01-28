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

const Comments = ({ user_id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comments/${user_id}`);
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
          <>
            <ListItem alignItems="flex-start">
              <Box sx={{ minWidth: "100px" }} alignItems={"flex-start"}>
                <ListItemAvatar>
                  <Avatar
                    alt={comment.firstname + " " + comment.lastname}
                    src={comment.profileImage}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.firstname + " " + comment.lastname}
                  secondary={comment.time}
                  className="wd--comment-name"
                />
                <Rating
                  name="read-only"
                  value={comment.rating}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </Box>
              <ListItemText
                primary={comment.subject}
                secondary={comment.content}
                className="wd--comment-content"
              />
            </ListItem>
            <Divider
              variant="inset"
              component="li"
              sx={{ marginRight: "72px" }}
            />
          </>
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
