import React, { useState } from "react";
import { IoMailUnreadSharp, IoMailOpenSharp } from "react-icons/io5";
import "./notificationMessage.css";

const NotificationMessage = ({ message, key }) => {
  const [showMessage, setShowMessage] = useState(false);
  const openMessage = () => {
    setShowMessage(!showMessage);
    message.opened = true;
  };
  return (
    <div
      key={key}
      className={
        showMessage
          ? "wd-profile--notifications--message opened"
          : "wd-profile--notifications--message "
      }
      id={message.opened ? "read" : "unread"}
      onClick={openMessage}
    >
      <div className="wd-profile--notifications--message-content">
        <p className="wd-profile--notifications--message-content-title">
          {message.subject}
        </p>
        <p className="wd-profile--notifications--message-content--text">
          {message.content}
        </p>
      </div>
      <div className="wd-profile--notifications--message--right">
        {message.opened ? (
          <IoMailOpenSharp size={25} color="grey" className="icon" />
        ) : (
          <IoMailUnreadSharp size={25} className="icon" />
        )}
        <p>{message.date}</p>
      </div>
    </div>
  );
};

export default NotificationMessage;
