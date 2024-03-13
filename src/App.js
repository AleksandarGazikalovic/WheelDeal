import React, { useState } from "react";
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
import { Comments, JwtAuth, Loading } from "./components";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/notFound/NotFound";

const App = () => {
  const { accessToken } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  return (
    <Router>
      <ToastContainer />
      <JwtAuth setIsLoading={setIsLoading} />
      {!isLoading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search-options"
            element={<SearchOptions filter={1} />}
          />
          <Route
            path="/add-post"
            element={accessToken ? <NewPosts /> : <Navigate to="/" replace />}
          />
          <Route
            path="/profile"
            element={accessToken ? <Profile /> : <Navigate to="/" replace />}
          />
          <Route path="/post/:postId" element={<CarPost />} />
          <Route path="/profile/:postId" element={<MyPost />} />
          <Route path="/verify/:token" element={<VerificationPage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/comments/" element={<Comments />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Loading />
      )}
    </Router>
  );
};

export default App;
