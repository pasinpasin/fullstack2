import {
  LIST_FAKULTETE_BEGIN,
  LIST_FAKULTETE_SUCCESS,
  LIST_FAKULTETE_ERROR,
  UPDATE_FAKULTETI_BEGIN,
  UPDATE_FAKULTETI_SUCCESS,
  UPDATE_FAKULTETI_ERROR,
  SHTO_FAKULTETE_BEGIN,
  SHTO_FAKULTETE_SUCCESS,
  SHTO_FAKULTETE_ERROR,
  FSHIJ_FAKULTETE_BEGIN,
  FSHIJ_FAKULTETE_SUCCESS,
  FSHIJ_FAKULTETE_ERROR,
} from "../constants/fakultetiConstants";
export const fakultetiListReducer = (state = { fakultetet: [] }, action) => {
  switch (action.type) {
    case LIST_FAKULTETE_BEGIN:
      return { loading: true, fakultetet: [] };
    case LIST_FAKULTETE_SUCCESS:
      return {
        loading: false,
        fakultetet: action.payload.result.items,
        //pages: action.payload.pages,
        //page: action.payload.page,
      };
    case LIST_FAKULTETE_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const fakultetiCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHTO_FAKULTETE_BEGIN:
      return { loading: true };
    case SHTO_FAKULTETE_SUCCESS:
      console.log(action.payload);
      return { success: true, fakulteti: action.payload };
    case SHTO_FAKULTETE_ERROR:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const fakultetiDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FSHIJ_FAKULTETE_BEGIN:
      return { loading: true };
    case FSHIJ_FAKULTETE_SUCCESS:
      return { success: true };
    case FSHIJ_FAKULTETE_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fakultetiUpdateReducer = (state = { fakulteti: {} }, action) => {
  switch (action.type) {
    case UPDATE_FAKULTETI_BEGIN:
      return { loading: true };
    case UPDATE_FAKULTETI_SUCCESS:
      console.log(action.payload);
      return { success: true, fakulteti: action.payload };
    case UPDATE_FAKULTETI_ERROR:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
