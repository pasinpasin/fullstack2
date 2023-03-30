import useAxios from "../hooks/useAxios"
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
    let api=useAxios();
  try {
    dispatch({ type: LIST_FAKULTETE_BEGIN })

    const { data } = await api.get(
      `fakulteti`
    )
    

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

export const updateFakultete = (id) => async (dispatch) => {
    let api=useAxios();
  try {
    dispatch({ type: UPDATE_FAKULTETI_BEGIN })

    const { data } = await api.patch(
      `fakulteti/${id}/`,{}
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

export const addFakultete = () => async (dispatch) => {
    let api=useAxios();
  try {
    dispatch({ type: SHTO_FAKULTETE_BEGIN })

    const { data } = await api.post(
      `fakulteti/`
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