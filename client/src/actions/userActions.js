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

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_BEGIN,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
