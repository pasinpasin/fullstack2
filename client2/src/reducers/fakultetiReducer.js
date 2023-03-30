import {
  LIST_FAKULTETE_BEGIN,
  LIST_FAKULTETE_SUCCESS,
  LIST_FAKULTETE_ERROR,
} from "../constants/fakultetiConstants";
export const fakultetiListReducer = (state = { fakultetet: [] }, action) => {
  switch (action.type) {
    case LIST_FAKULTETE_BEGIN:
      return { loading: true, fakultetet: [] };
    case LIST_FAKULTETE_SUCCESS:
      return {
        loading: false,
        fakultetet: action.payload.fakultetet,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case LIST_FAKULTETE_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
