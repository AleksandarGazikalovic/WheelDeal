import React, { useEffect } from "react";
import "./profileNotification.css";
import NotificationMessage from "../notificationMessage/NotificationMessage";
import { fetchNotifications } from "../../redux/notificationsSlice";
import { useDispatch, useSelector } from "react-redux";
const ProfileNotification = () => {
  // const MockNotifications = [
  //   {
  //     subject: "Tehnicki pregled putnickih vozila",
  //     content:
  //       "Ovo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimo",
  //     opened: true,
  //     date: "26/02/2024",
  //   },

  //   {
  //     subject: "Tehnicki pregled putnickih vozila",
  //     content: "Ovo je drugo obavestenje",
  //     opened: false,
  //     date: "26/02/2024",
  //   },

  //   {
  //     subject: "Tehnicki pregled putnickih vozila",
  //     content:
  //       " Ovo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimoOvo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimoOvo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimoOvo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimoOvo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimoOvo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimo",
  //     opened: true,
  //     date: "26/02/2024",
  //   },

  //   {
  //     subject: "Tehnicki pregled putnickih vozila",
  //     content: "Ovo je drugo obavestenje",
  //     opened: true,
  //     date: "26/02/2024",
  //   },
  //   {
  //     subject: "Tehnicki pregled putnickih vozila",
  //     content:
  //       "Ovo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimo",
  //     opened: true,
  //     date: "26/02/2024",
  //   },

  //   {
  //     subject: "Tehnicki pregled putnickih vozila",
  //     content: "Ovo je drugo obavestenje",
  //     opened: true,
  //     date: "26/02/2024",
  //   },
  //   {
  //     subject: "Tehnicki pregled putnickih vozila",
  //     content:
  //       "Ovo je prvo obavestenje koje ce da bude poslato sa platforme ove na kojoj se nalazimo",
  //     opened: false,
  //     date: "26/02/2024",
  //   },
  // ];
  const dispatch = useDispatch();
  const { userInfo, pending, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchNotifications(userInfo));
  }, [dispatch]);

  const fetchNotifications = useSelector((state) => state.notifications);

  fetchNotifications.sort((a, b) =>
    a.opened === b.opened ? 0 : a.opened ? 1 : -1
  );
  return (
    <div className="wd-profile--notifications-wrapper">
      <p className="wd-profile--notifications--title">Messages inbox</p>
      <div className="wd-profile--notifications--container">
        {fetchNotifications.length === 0 ? (
          <p>You have no messages</p>
        ) : (
          fetchNotifications.map((message) => (
            <NotificationMessage message={message} key={message.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileNotification;
