import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_BEGIN:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        authTokens: action.payload.authTokens,
      };
    case LOGIN_USER_ERROR:
      //console.log(action.payload);
      return { loading: false, error: action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};
