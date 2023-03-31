import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { fakultetiListReducer } from "./reducers/fakultetiReducer";
import { userLoginReducer } from "./reducers/userReducers";
import { viewReducer } from "./reducers/viewReducer";
import jwt_decode from "jwt-decode";

const reducer = combineReducers({
  fakultetilist: fakultetiListReducer,
  loginUser: userLoginReducer,
  view: viewReducer,
});

const userInfoFromStorage = sessionStorage.getItem("authTokens")
  ? JSON.parse(sessionStorage.getItem("authTokens"))
  : null;
const userFromStorage = sessionStorage.getItem("authTokens")
  ? jwt_decode(sessionStorage.getItem("authTokens"))
  : null;

const initialState = {
  loginUser: { authTokens: userInfoFromStorage, user: userFromStorage },
  showSidebar: true,
};
console.log(initialState);
const middleware = [thunk];
const store = configureStore(
  { reducer: reducer },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
