import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  TOGGLE_SIDEBAR,
} from "../constants/viewConstants";
export const viewReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        showSidebar: !state.showSidebar,
      };
    default:
      return state;
  }
};
