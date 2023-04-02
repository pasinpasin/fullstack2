import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  TOGGLE_SIDEBAR,
} from "../constants/viewConstants";

export const toggleSidebar = () => async (dispatch) => { 

  dispatch({ type: TOGGLE_SIDEBAR });
};
