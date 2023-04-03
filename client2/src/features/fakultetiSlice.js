import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const baseURL = "http://localhost:5000/api/";

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
};

export const shtoFakultet = createAsyncThunk(
  "fakultete/shto",
  async (fakultet, { rejectWithValue }) => {
    try {
      const response = await api.post("fakulteti/", fakultet);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getFakultete = createAsyncThunk(
  "fakultete/get",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await api.get("fakulteti");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteFakulteti = createAsyncThunk(
  "fakultete/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete("fakulteti/" + id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateFakulteti = createAsyncThunk(
  "fakultete/perditeso",
  async (fakulteti, { rejectWithValue }) => {
    try {
      const { id, emertimi } = fakulteti;

      const response = await api.patch(baseURL + "fakulteti/" + id + "/", {
        emertimi:emertimi,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

const fakultetiSlice = createSlice({
  name: "fakultetet",
  initialState,
  reducers: {},
  extraReducers: {
    [shtoFakultet.pending]: (state, action) => {
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
    },
    [shtoFakultet.fulfilled]: (state, action) => {
      // state.todos.push(action.payload);
      return {
        ...state,
        todos: [action.payload, ...state.fakultete],
        shtofakulteteStatus: "success",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    },
    [shtoFakultet.rejected]: (state, action) => {
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
    },
    [getFakultete.pending]: (state, action) => {
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
    },
    [getFakultete.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "success",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    },
    [getFakultete.rejected]: (state, action) => {
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
    },
    [deleteFakulteti.pending]: (state, action) => {
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
    },
    [deleteFakulteti.fulfilled]: (state, action) => {
      const currentFakultete = state.fakultete.filter(
        (fakultet) => fakultet.id !== action.payload.id
      );
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
    },
    [deleteFakulteti.rejected]: (state, action) => {
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
    },
    [updateFakulteti.pending]: (state, action) => {
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
    },
    [updateFakulteti.fulfilled]: (state, action) => {
      const updatedFakultete = state.fakultete.map((fakultet) =>
        fakultet.id === action.payload.id ? action.payload : fakultet
      );
      return {
        ...state,
        todos: updatedFakultete,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "success",
        updateFakultetiError: "",
      };
    },
    [updateFakulteti.rejected]: (state, action) => {
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
    },
  },
});

export default fakultetiSlice.reducer;