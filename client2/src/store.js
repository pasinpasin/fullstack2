import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  fakultetiListReducer,
  fakultetiCreateReducer,
  fakultetiDeleteReducer,
  fakultetiUpdateReducer,
} from "./reducers/fakultetiReducer";
import { userLoginReducer } from "./reducers/userReducers";
import { viewReducer } from "./reducers/viewReducer";

import fakultetiReducer from "./features/fakultetiSlice"

import jwt_decode from "jwt-decode";

const reducer = combineReducers({
  fakultetiState: fakultetiReducer,
  fakultetilist: fakultetiListReducer,
  fakultetiri: fakultetiCreateReducer,
  fshijfakultet: fakultetiDeleteReducer,
  fakultetiupdate: fakultetiUpdateReducer,
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
  view: { showSidebar: true },
};

const middleware = [thunk];
const store = configureStore(
  { reducer: reducer, preloadedState: initialState },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
