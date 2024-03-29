import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer } from "./reducers/userReducers";
import { viewReducer } from "./reducers/viewReducer";

import fakultetiReducer from "./features/fakultetiSlice";
import departamentiReducer from "./features/departamentiSlice";
import programiReducer from "./features/programiSlice";
import pedagogeReducer from "./features/pedagogetSlice";
import userReducer  from "./features/userSlice"
import planetReducer from "./features/planetSlice"
import planpermbajtjaReducer from "./features/planpermbajtjaSlice"
import lenndeMeZgjedhjeReducer from "./features/lendeMeZgjedhjeSlice"

import jwt_decode from "jwt-decode";

const reducer = combineReducers({
  fakultetiState: fakultetiReducer,
  departamentiState: departamentiReducer,
  programiState: programiReducer,
  pedagogeState: pedagogeReducer,
  planiState: planetReducer,
  planpermbajtjaState: planpermbajtjaReducer,
  lendemezgjedhjeState:lenndeMeZgjedhjeReducer,
  userState: userReducer,
  loginUser: userLoginReducer,
  view: viewReducer,
  //fakultetilist: fakultetiListReducer,
  //fakultetiri: fakultetiCreateReducer,
  //fshijfakultet: fakultetiDeleteReducer,
  //fakultetiupdate: fakultetiUpdateReducer,
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
