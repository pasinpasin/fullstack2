import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  TOGGLE_SIDEBAR,
} from "../constants/viewConstants";
import { useDispatch, useSelector } from "react-redux";

export const viewReducer = (state = {}, action) => {
  
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      //console.log(state.showSidebar)
      return {
        showSidebar: !state.showSidebar
      };
    default:
      return state;
  }
};
