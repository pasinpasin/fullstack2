import api from "../utils/api";
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
  } from "../constants/fakultetiConstants";

 
  
export const listFakultete = () => async (dispatch) => {
  
  try {
    dispatch({ type: LIST_FAKULTETE_BEGIN });

    const { data } = await api.get(
      `fakulteti`
    );
    console.log(data)
    

    dispatch({
      type: LIST_FAKULTETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LIST_FAKULTETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateFakultete = (id,bodytosend) => async (dispatch) => {
    
  try {
    dispatch({ type: UPDATE_FAKULTETI_BEGIN })

    const { data } = await api.patch(
      `fakulteti/${id}/`,bodytosend
    )
    

    dispatch({
      type: UPDATE_FAKULTETI_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_FAKULTETI_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addFakultete = (datatosend) => async (dispatch) => {
   
  try {
    dispatch({ type: SHTO_FAKULTETE_BEGIN })

    const { data } = await api.post(
      `fakulteti/`,datatosend
    )
    

    dispatch({
      type: SHTO_FAKULTETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHTO_FAKULTETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}