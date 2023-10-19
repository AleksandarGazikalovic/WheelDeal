import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { setUser } from "../../redux/userSlice";

const JwtAuth = () => {
  const dispatch = useDispatch();
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("refreshToken")}`;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
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
    if (localStorage.getItem("refreshToken")) {
      const fetchUser = async () => {
        const res = await axios.get(`/users/`);
        dispatch(setUser(res.data));
      };
      fetchUser();
    }
  }, []);
  return <></>;
};

export default JwtAuth;
