import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LIST_USER_BEGIN,
  LIST_USER_SUCCESS,
  LIST_USER_ERROR,
  DISABLE_USER_BEGIN,
  DISABLE_USER_SUCCESS,
  DISABLE_USER_ERROR,
  LOGOUT_USER,
} from "../constants/userConstants";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

export const login = (currentuser) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_BEGIN,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/token/",
      currentuser,
      config
    );
    console.log(data);

    const user = jwt_decode(data.access);
    sessionStorage.setItem("authTokens", JSON.stringify(data));
    const authTokens = data;
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { user, authTokens },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LOGIN_USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("authTokens");

  dispatch({ type: LOGOUT_USER });

  document.location.href = "/login";
};
