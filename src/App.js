import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  SearchOptions,
  NewPosts,
  CarPost,
  Profile,
  VerificationPage,
  ResetPassword,
  MyPost,
} from "./pages";
import { useSelector } from "react-redux";
import { Comments, JwtAuth } from "./components";

const App = () => {
  const user = useSelector((state) => state.user);
  return (
    <Router>
      <JwtAuth />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-options" element={<SearchOptions filter={1} />} />
        <Route
          path="/add-post"
          element={
            user.userInfo.email ? (
              <NewPosts />
            ) : (
              <Navigate to="/search-options" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user.userInfo.email ? (
              <Profile />
            ) : (
              <Navigate to="/search-options" replace />
            )
          }
        />
        <Route path="/post/:postId" element={<CarPost />} />
        <Route path="/profile/:postId" element={<MyPost />} />
        <Route path="/verify/:token" element={<VerificationPage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/comments/" element={<Comments />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
