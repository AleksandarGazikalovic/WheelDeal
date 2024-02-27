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

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it

      // case Access token expired
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data !== undefined &&
        error.response.data.message !== undefined &&
        error.response.data.message === "Access token expired" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        console.log("Access token expired");
        try {
          const response = await axios.get(
            API_ENDPOINT + `/auth/handleAccessTokenExpiry`,
            { withCredentials: true }
          );
          const { accessToken } = response.data;
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

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
      // case Refresh token expired -> "Vasa sesija je istekla" form
      else if (
        error.response &&
        error.response.status === 401 &&
        error.response.data !== undefined &&
        error.response.data.message !== undefined &&
        error.response.data.message === "Refresh token expired" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        console.log("Delete access token due to refresh token expiry");
        dispatch(setAccessToken(""));
        dispatch(setUser({}));
        handleShowSessionExpired();
        return axios(originalRequest);
      } else {
        // console.log("Delete access token")
        // dispatch(setAccessToken(""))
        // dispatch(setUser({}))
      }

      return Promise.reject(error);
    }
  );

  // useEffect(() => {
  //   axios
  //     .post("/auth/refresh")
  //     .then((res) => {
  //       localStorage.setItem("refreshToken", res.data.refreshToken);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    const getAccessToken = async () => {
      //console.log(userInfo.accessToken)
      await axios
        .get(API_ENDPOINT + `/auth/handleRefreshToken`, {
          withCredentials: true,
        })
        .then((res) => {
          if (
            res !== undefined &&
            res.status !== undefined &&
            res.status === 401
          ) {
            // no refresh token
            // dont do anything
          } else if (
            res !== undefined &&
            res.status !== undefined &&
            res.status === 403
          ) {
            // refresh token expired or potential exploit of token attempted
            // remove refresh token -> backend does this
          } else if (res !== undefined && res.data !== undefined) {
            // refresh token is present an hasn't expired ->
            dispatch(setAccessToken(res.data.accessToken));
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`; // set Bearer to user's current accessToken
            console.log("Bearer set in getAccessToken");
            fetchUser();
          }
        })
        .catch((err) => {
          // console.log(err)
          // console.log("Called from here")
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
        <h1 className="session-expired-title">Vaša sesija je istekla!</h1>
        <h4 className="session-expired-body">
          Molimo Vas da se ponovo ulogujete
        </h4>
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
