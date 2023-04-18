import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  lendemezgjedhje: [],
  shtoLendemezgjedhjeStatus: "",
  shtoLendemezgjedhjeError: "",
  getLendemezgjedhjeStatus: "",
  getLendemezgjedhjeError: "",
  getLendemezgjedhjeNgaFakStatus: "",
  getLendemezgjedhjeNgaFakError: "",
  deleteLendemezgjedhjeStatus: "",
  deleteLendemezgjedhjeError: "",
  updateLendemezgjedhjeStatus: "",
  updateLendemezgjedhjeError: "",
};

export const shtoLendemezgjedhje = createAsyncThunk(
  "lendemezgjedhjet/shto",
  async (plan, { rejectWithValue }) => {
    try {
      const response = await api.post("lendemezgjedhje/", plan);

      return response.data;
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

export const getLendemezgjedhje = createAsyncThunk(
  "lendemezgjedhjet/get",
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await api.get(`plani/${id}/lendemezgjedhje`);
        return response.data;
      } else {
        const response = await api.get("lendemezgjedhje");
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

export const deleteLendemezgjedhje = createAsyncThunk(
  "lendemezgjedhjet/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`lendemezgjedhje/${id}`);
      console.log(response);
      return response.data;
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

export const updateLendemezgjedhje = createAsyncThunk(
  "lendemezgjedhjet/perditeso",
  async (lendemezgjedhje, { rejectWithValue }) => {
    console.log(lendemezgjedhje);
    try {
      const { id } = lendemezgjedhje;

      const response = await api.patch(
        `lendemezgjedhje/${id}/`,
        lendemezgjedhje
      );
      return response.data;
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

const lendeMeZgjedhjeSlice = createSlice({
  name: "lendemezgjedhjet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shtoLendemezgjedhje.pending, (state, action) => {
      return {
        ...state,
        shtoLendemezgjedhjeStatus: "pending",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });

    builder.addCase(shtoLendemezgjedhje.fulfilled, (state, action) => {
      //console.log(action.payload);

      return {
        ...state,
        lendemezgjedhje: [
          action.payload.result.items,
          ...state.lendemezgjedhje,
        ],

        shtoLendemezgjedhjeStatus: "success",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });
    //[shtoPlan.rejected]: (state, action) => {
    builder.addCase(shtoLendemezgjedhje.rejected, (state, action) => {
      return {
        ...state,
        shtoLendemezgjedhjeStatus: "rejected",
        shtoLendemezgjedhjeError: action.payload,
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });
    builder.addCase(getLendemezgjedhje.pending, (state, action) => {
      //[getLendemezgjedhje.pending]: (state, action) => {
      return {
        ...state,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "pending",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });
    builder.addCase(getLendemezgjedhje.fulfilled, (state, action) => {
      //[getLendemezgjedhje.fulfilled]: (state, action) => {

      return {
        ...state,
        lendemezgjedhje: action.payload.result.items,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "success",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });
    //[getLendemezgjedhje.rejected]: (state, action) => {
    builder.addCase(getLendemezgjedhje.rejected, (state, action) => {
      return {
        ...state,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "rejected",
        getLendemezgjedhjeError: action.payload,
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });

    // [deleteLendemezgjedhje.pending]: (state, action) => {
    builder.addCase(deleteLendemezgjedhje.pending, (state, action) => {
      return {
        ...state,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "pending",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });
    //[deleteLendemezgjedhje.fulfilled]: (state, action) => {
    builder.addCase(deleteLendemezgjedhje.fulfilled, (state, action) => {
      const currentDep = state.lendemezgjedhje.filter(
        (plan) => plan.id !== action.payload.result.items.id
      );
      //sessionStorage.setItem("lendemezgjedhjet", JSON.stringify(currentDep));
      return {
        ...state,
        lendemezgjedhje: currentDep,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "success",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });
    //[deleteLendemezgjedhje.rejected]: (state, action) => {
    builder.addCase(deleteLendemezgjedhje.rejected, (state, action) => {
      state = {
        ...state,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "rejected",
        deleteLendemezgjedhjeError: action.payload,
        updateLendemezgjedhjeStatus: "",
        updateLendemezgjedhjeError: "",
      };
    });
    // [updateLendemezgjedhje.pending]: (state, action) => {
    builder.addCase(updateLendemezgjedhje.pending, (state, action) => {
      return {
        ...state,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "pending",
        updateLendemezgjedhjeError: "",
      };
    });
    //[updateLendemezgjedhje.fulfilled]: (state, action) => {
    builder.addCase(updateLendemezgjedhje.fulfilled, (state, action) => {
      const updatedLendemezgjedhje = state.lendemezgjedhje.map((plan) =>
        plan.id === action.payload.result.items.id
          ? action.payload.result.items
          : plan
      );
      //console.log(updatedLendemezgjedhje);
      sessionStorage.setItem(
        "lendemezgjedhjet",
        JSON.stringify(updatedLendemezgjedhje)
      );
      return {
        ...state,
        lendemezgjedhje: updatedLendemezgjedhje,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "success",
        updateLendemezgjedhjeError: "",
      };
    });
    // [updateLendemezgjedhje.rejected]: (state, action) => {
    builder.addCase(updateLendemezgjedhje.rejected, (state, action) => {
      return {
        ...state,
        shtoLendemezgjedhjeStatus: "",
        shtoLendemezgjedhjeError: "",
        getLendemezgjedhjeStatus: "",
        getLendemezgjedhjeError: "",
        deleteLendemezgjedhjeStatus: "",
        deleteLendemezgjedhjeError: "",
        updateLendemezgjedhjeStatus: "rejected",
        updateLendemezgjedhjeError: action.payload,
      };
    });
  },
});

export default lendeMeZgjedhjeSlice.reducer;
