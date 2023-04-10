import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  pedagoge: [],

  getPedagogeStatus: "",
  getPedagogeError: "",
};

export const getPedagoget = createAsyncThunk(
  "pedagoge/get",
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await api.get(`departamenti/${id}/pedagoget`);
        return response.data;
      } else {
        const response = await api.get("users");
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const pedagogetSlice = createSlice({
  name: "pedagoget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPedagoget.pending, (state, action) => {
      return {
        ...state,

        getPedagogeStatus: "pending",
        getPedagogeError: "",
      };
    });
    builder.addCase(getPedagoget.fulfilled, (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        pedagoge: action.payload.result.items,

        getPedagogeStatus: "success",
        getPedagogeError: "",
      };
    });
    //[getPrograme.rejected]: (state, action) => {
    builder.addCase(getPedagoget.rejected, (state, action) => {
      return {
        ...state,

        getPedagogeStatus: "rejected",
        getPedagogeError: action.payload,
      };
    });
  },
});

export default pedagogetSlice.reducer;
