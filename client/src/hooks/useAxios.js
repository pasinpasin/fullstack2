import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import { useAppContext } from "../context/appContext";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  GET_FAKULTETE_SUCCESS,
  GET_FAKULTETE_BEGIN,
  GET_FAKULTETE_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  SHTO_FAKULTET_BEGIN,
  SHTO_FAKULTET_SUCCESS,
  SHTO_FAKULTET_ERROR,
  GET_PEDAGOG_BEGIN,
  GET_PEDAGOG_SUCCESS,
  GET_PEDAGOG_ERROR,
  VALIDO_INPUT,
  TOUCH_INPUT,
  GET_CURRENT_USER_AUTH,
  TOKEN_REFRESH,
} from "../context/Actions";

const baseURL = "http://127.0.0.1:8000";

const useAxios = () => {
  const { authTokens, user, dispatch } = useAppContext();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  const authT = JSON.parse(sessionStorage.getItem("authTokens"));

  axiosInstance.interceptors.request.use(async (req) => {
    if (authT) {
      const isExpired =
        dayjs.unix(jwt_decode(authT.access).exp).diff(dayjs()) < 1;
      console.log("Is token expired: ", isExpired);
      if (!isExpired) return req;

      console.log("ka hyre");
      try {
        dispatch({
          type: GET_CURRENT_USER_SUCCESS,
        });
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: authT.refresh,
        });
        const authTokens = response.data;
        const user = jwt_decode(response.data.access);

        sessionStorage.setItem("authTokens", JSON.stringify(response.data));
        dispatch({
          type: GET_CURRENT_USER_SUCCESS,
          payload: { user, authTokens },
        });
        //setAuthTokens(response.data);
        //setUser(jwt_decode(response.data.access));

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
      } catch (error) {
        console.log(error);
        dispatch({
          type: GET_CURRENT_USER_ERROR,
        });
      }
    }
  });

  return axiosInstance;
};

export default useAxios;
