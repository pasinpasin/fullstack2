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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_BEGIN:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOGIN_USER_ERROR:
      return { loading: false, error: action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};
