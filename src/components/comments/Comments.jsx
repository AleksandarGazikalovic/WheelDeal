import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const Comments = ({ post_id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get( API_ENDPOINT + `/users/${post_id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [post_id]);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {comments.map((comment) => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={comment.firstname + " " + comment.lastname}
              src={comment.profileImage}
            />
          </ListItemAvatar>
          <ListItemText primary={comment.time} />
          <ListItemText primary={comment.subject} secondary={comment.content} />
        </ListItem>
      ))}
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default Comments;
