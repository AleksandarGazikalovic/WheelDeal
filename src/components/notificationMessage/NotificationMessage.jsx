import React, { useState } from "react";
import { IoMailUnreadSharp, IoMailOpenSharp } from "react-icons/io5";
import "./notificationMessage.css";
import { updateNotification } from "../../redux/notificationsSlice";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

const NotificationMessage = ({ message, key }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [readMessage, setReadMessage] = useState(false);
  const dispatch = useDispatch();

  const openMessage = () => {
    setShowMessage(!showMessage);
    setReadMessage(true);
    if (message.isOpened == false) {
      try {
        dispatch(
          updateNotification({
            ...message,
            isOpened: true,
          })
        ).then((result) => {
          setShowMessage(!showMessage);
        });
      } catch (error) {
        console.error("Error opening message:", error);
      }
    }
  };

  var formattedDate = format(new Date(message.createdAt), "dd/mm/yyyy");

  return (
    <div
      key={key}
      className={
        showMessage
          ? "wd-profile--notifications--message opened"
          : "wd-profile--notifications--message "
      }
      id={message.isOpened ? "read" : readMessage ? "read" : "unread"}
      onClick={openMessage}
    >
      <div className="wd-profile--notifications--message-content">
        <p className="wd-profile--notifications--message-content-title">
          {message.title}
        </p>
        <p
          className={
            readMessage
              ? "wd-profile--notifications--message-content--text"
              : "wd-profile--notifications--message-content--unreadText"
          }
        >
          {message.content}
        </p>
      </div>
      <div className="wd-profile--notifications--message--right">
        {message.isOpened ? (
          <IoMailOpenSharp size={25} color="grey" className="icon" />
        ) : (
          <IoMailUnreadSharp size={25} className="icon" />
        )}
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NotificationMessage;
