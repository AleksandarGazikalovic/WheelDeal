import React, { Suspense, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, SearchOptions, ResetPassword, Onboarding } from "./pages";
import { useSelector } from "react-redux";
import { Comments, JwtAuth, Loading } from "./components";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/notFound/NotFound";
const NewPosts = React.lazy(() => import("./pages/newPosts/NewPosts"));
const NewVehicle = React.lazy(() => import("./pages/newVehicle/NewVehicle"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const CarPost = React.lazy(() => import("./pages/carPost/CarPost"));
const MyPost = React.lazy(() => import("./pages/myPost/MyPost"));
const VerificationPage = React.lazy(() =>
  import("./pages/verificationPage/VerificationPage")
);

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
          <Route path="/search-options" element={<SearchOptions />} />
          <Route
            path="/add-post"
            element={
              accessToken ? (
                <Suspense fallback={<Loading />}>
                  <NewPosts />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/add-vehicle"
            element={
              accessToken ? (
                <Suspense fallback={<Loading />}>
                  <NewVehicle />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              accessToken ? (
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/post/:postId"
            element={
              <Suspense fallback={<Loading />}>
                <CarPost />
              </Suspense>
            }
          />
          <Route
            path="/profile/:postId"
            element={
              <Suspense fallback={<Loading />}>
                <MyPost />
              </Suspense>
            }
          />
          <Route
            path="/verify/:token"
            element={
              <Suspense fallback={<Loading />}>
                <VerificationPage />
              </Suspense>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/onboarding"
            element={accessToken ? <Onboarding /> : <Navigate to="/" replace />}
          />
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
