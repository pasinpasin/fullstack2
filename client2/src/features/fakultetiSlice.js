import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  fakultete: [],

  shtofakulteteStatus: "",
  shtofakulteteError: "",
  getFakulteteStatus: "",
  getFakulteteError: "",
  deleteFakultetiStatus: "",
  deleteFakultetiError: "",
  updateFakultetiStatus: "",
  updateFakultetiError: "",
  getFakulteteNgaDepStatus: "",
  getFakultetengaDepError: "",
};

export const shtoFakultet = createAsyncThunk(
  "fakultetet/shto",
  async (fakultet, { rejectWithValue }) => {
    try {
      const response = await api.post("fakulteti/", {
        emertimi: fakultet.emertimi,
      });
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

export const getFakultete = createAsyncThunk(
  "fakultetet/get",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await api.get("fakulteti");
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

export const deleteFakulteti = createAsyncThunk(
  "fakultetet/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`fakulteti/${id}`);
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

export const updateFakulteti = createAsyncThunk(
  "fakultetet/perditeso",
  async (fakulteti, { rejectWithValue }) => {
    try {
      const { id, emertimi } = fakulteti;

      const response = await api.patch(`fakulteti/${id}/`, {
        emertimi: emertimi,
      });
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

const fakultetiSlice = createSlice({
  name: "fakultetet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shtoFakultet.pending, (state, action) => {
      //[shtoFakultet.pending]: (state, action) => {
      return {
        ...state,
        shtofakulteteStatus: "pending",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    // [shtoFakultet.fulfilled]: (state, action) => {
    builder.addCase(shtoFakultet.fulfilled, (state, action) => {
      // state.todos.push(action.payload);
      return {
        ...state,
        fakultete: [action.payload, ...state.fakultete],
        shtofakulteteStatus: "success",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    //[shtoFakultet.rejected]: (state, action) => {
    builder.addCase(shtoFakultet.rejected, (state, action) => {
      return {
        ...state,
        shtofakulteteStatus: "rejected",
        shtofakulteteError: action.payload,
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    builder.addCase(getFakultete.pending, (state, action) => {
      //[getFakultete.pending]: (state, action) => {
      return {
        ...state,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "pending",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    builder.addCase(getFakultete.fulfilled, (state, action) => {
      //[getFakultete.fulfilled]: (state, action) => {
      return {
        ...state,
        fakultete: action.payload.result.items,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "success",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    //[getFakultete.rejected]: (state, action) => {
    builder.addCase(getFakultete.rejected, (state, action) => {
      return {
        ...state,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "rejected",
        getFakulteteError: action.payload,
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });

    // [deleteFakulteti.pending]: (state, action) => {
    builder.addCase(deleteFakulteti.pending, (state, action) => {
      return {
        ...state,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "pending",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    //[deleteFakulteti.fulfilled]: (state, action) => {
    builder.addCase(deleteFakulteti.fulfilled, (state, action) => {
      const currentFakultete = state.fakultete.filter(
        (fakultet) => fakultet.id !== action.payload.result.items.id
      );
      console.log(action.payload);
      return {
        ...state,
        fakultete: currentFakultete,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "success",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    //[deleteFakulteti.rejected]: (state, action) => {
    builder.addCase(deleteFakulteti.rejected, (state, action) => {
      state = {
        ...state,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "rejected",
        deleteFakultetiError: action.payload,
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    // [updateFakulteti.pending]: (state, action) => {
    builder.addCase(updateFakulteti.pending, (state, action) => {
      return {
        ...state,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "pending",
        updateFakultetiError: "",
      };
    });
    //[updateFakulteti.fulfilled]: (state, action) => {
    builder.addCase(updateFakulteti.fulfilled, (state, action) => {
      const updatedFakultete = state.fakultete.map((fakultet) =>
        fakultet.id === action.payload.id ? action.payload : fakultet
      );
      console.log(updatedFakultete);
      return {
        ...state,
        fakultete: updatedFakultete,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "success",
        updateFakultetiError: "",
      };
    });
    // [updateFakulteti.rejected]: (state, action) => {
    builder.addCase(updateFakulteti.rejected, (state, action) => {
      return {
        ...state,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "rejected",
        updateFakultetiError: action.payload,
      };
    });
  },
});

export default fakultetiSlice.reducer;
