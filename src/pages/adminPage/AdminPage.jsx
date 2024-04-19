import React from "react";
import "./adminPage.css";

const AdminPage = () => {
  return (
    <div className="wd--admin-profile">
      <div className="wd--admin-profile-wrapper">
        {/* <Sidebar /> */}
        <div className="wd--admin-profile--main">
          <div className="wd--admin-profile--main-header">
            <h1> Welcome to the admin panel</h1>
          </div>
          <div className="wd--admin-profile--main-properties">
            <div className="wd--admin-profile--main--users">
              <h2>All members</h2>
            </div>
            <div className="wd--admin-profile--main--users">
              <h2>All members</h2>
            </div>
            <div className="wd--admin-profile--main--users">
              <h2>All members</h2>
            </div>
            <div className="wd--admin-profile--main--users">
              <h2>All members</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
