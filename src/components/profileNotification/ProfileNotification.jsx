import React, { useEffect } from "react";
import "./profileNotification.css";
import NotificationMessage from "../notificationMessage/NotificationMessage";
import { fetchNotifications } from "../../redux/notificationsSlice";
import { useDispatch, useSelector } from "react-redux";
const ProfileNotification = () => {
  const dispatch = useDispatch();
  const { userInfo, pending, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo._id != null) dispatch(fetchNotifications(userInfo));
  }, [userInfo]);

  const { notifications } = useSelector((state) => state.notifications);

  notifications.sort((a, b) =>
    a.isOpened === b.isOpened ? 0 : a.isOpened ? 1 : -1
  );
  return (
    <div className="wd-profile--notifications-wrapper">
      <p className="wd-profile--notifications--title">Messages inbox</p>
      <div className="wd-profile--notifications--container">
        {notifications.length === 0 ? (
          <p>You have no messages</p>
        ) : (
          notifications.map((message) => (
            <NotificationMessage message={message} key={message.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileNotification;
