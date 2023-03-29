import axios from "axios";
import dayjs from "dayjs";
import router from "./router/router";
import jwt_decode from "jwt-decode";
import {
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
} from "../constants/userConstants";

const axiosconfig = () => {
  const authTokens = sessionStorage.getItem("authTokens")
    ? JSON.parse(sessionStorage.getItem("authTokens"))
    : null;
  axios.interceptors.request.use(
    (config) => {
      config.baseURL = "http://127.0.0.1:8000";
      if (authTokens != null) {
        config.headers["Authorization"] = "Bearer " + authTokens?.access;
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        originalRequest.url === "http://127.0.0.1:8000/token/"
      ) {
        router.push("/login");
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const authTokens = sessionStorage.getItem("authTokens");
        return axios
          .post("/token/refresh/", {
            refresh: authTokens.refresh,
          })
          .then((res) => {
            if (res.status === 201) {
              sessionStorage.setItem("authTokens", JSON.stringify(res.data));
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + JSON.parse(sessionStorage.getItem("authTokens"));
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );
};
export default axiosconfig;
