import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axiosInstance from "./api";
import {refreshToken} from "../actions/userActions"

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      
      
      const token = sessionStorage.getItem("authTokens")
  ? JSON.parse(sessionStorage.getItem("authTokens"))?.access
  : null;
  //console.log(token)
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot adn Django back-end
      
        //config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/token/" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/token/refresh/", {
              refresh:  JSON.parse(sessionStorage.getItem("authTokens"))?.refresh
             
              
            });
            console.log(rs);

            const  authTokens  = rs.data;
           

            dispatch(refreshToken(authTokens));

            sessionStorage.setItem("authTokens", JSON.stringify(authTokens));

            

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;

