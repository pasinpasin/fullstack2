import { configureStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { fakultetiListReducer } from "./reducers/fakultetiReducer";

const reducer = combineReducers({
  fakultetilist: fakultetiListReducer,
});
const initialState = {};
const middleware = [thunk];
const store = configureStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
