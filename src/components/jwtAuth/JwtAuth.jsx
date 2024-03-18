import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./jwtAuth.css";
import Loading from "../loading/Loading";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const JwtAuth = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { userInfo, pending, error } = useSelector((state) => state.user);
  const { accessToken } = useSelector((state) => state.user);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  const handleShowSessionExpired = () => {
    setShowSessionExpired(true);
  };

  const handleCloseSessionExpired = () => {
    setShowSessionExpired(false);
  };

  const setBearer = (accessToken) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the access token has expired and we need to refresh it (access token expiry)
      // or refresh token has expired and we need to invalidate access token if we have one (refresh token expiry)

      // case Access token expired
      if (
        error.response.status === 401 &&
        error.response.data.message === "Access token expired" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        console.log("Access token expired");
        try {
          // try to issue new access token
          const response = await axios.get(
            API_ENDPOINT + `/auth/handleAccessTokenExpiry`,
            { withCredentials: true }
          );
          const { accessToken } = response.data;
          setBearer(accessToken);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          dispatch(setAccessToken(accessToken));
          return axios(originalRequest);
        } catch (error) {
          // Handle refresh token error or redirect to login
        } finally {
          setIsLoading(false); // Set loading to false
        }
      }
      // case Refresh token expired -> "Your session has expired" form
      else if (
        error?.response?.status === 401 &&
        error?.response?.data?.message === "Refresh token expired" &&
        !originalRequest._retry
      ) {
        // remove refresh token due to expiry -> can't issue new access token until new login
        originalRequest._retry = true;
        console.log("Delete access token due to refresh token expiry");
        dispatch(setAccessToken(""));
        dispatch(setUser({}));
        handleShowSessionExpired();
        return axios(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    // call when client enters the site - if user has been logged in earlier,
    // try to issue him a new access token using refresh token (if present)
    const getAccessToken = async () => {
      //console.log(userInfo.accessToken)
      await axios
        .get(API_ENDPOINT + `/auth/handleRefreshToken`, {
          withCredentials: true,
        })
        .then((res) => {
          // refresh token is present and hasn't expired ->
          dispatch(setAccessToken(res.data.accessToken));
          setBearer(res.data.accessToken); // set Bearer to user's current accessToken
          console.log("Bearer set in getAccessToken");
          fetchUser();
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false
        });
    };

    const fetchUser = async () => {
      const res = await axios.get(API_ENDPOINT + `/users/`);
      dispatch(setUser(res.data));
    };

    getAccessToken();
  }, []);

  return showSessionExpired ? (
    <div className="session-expired-overlay">
      <div className="session-expired slide-top">
        <h1 className="session-expired-title">Your session has expired!</h1>
        <h4 className="session-expired-body">Please log in again</h4>
        <button
          className="confirm-button"
          type="submit"
          onClick={handleCloseSessionExpired}
        >
          OK
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default JwtAuth;
