import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  departamentengafakulteti: [],
  shtoDepartamenteStatus: "",
  shtoDepartamenteError: "",
  getDepartamenteStatus: "",
  getDepartamenteError: "",
  deleteDepartamentiStatus: "",
  deleteDepartamentiError: "",
  updateDepartamentiStatus: "",
  updateDepartamentiError: "",
};

export const shtoDepartament = createAsyncThunk(
  "departamentet/shto",
  async (departament, { rejectWithValue }) => {
    try {
      const response = await api.post("departamenti/", {
        emertimi: departament.emertimi,
        fakulteti: departament.fakulteti,
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

export const getDepartamente = createAsyncThunk(
  "departamentet/get",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await api.get("departamenti");
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

export const deleteDepartamenti = createAsyncThunk(
  "departamentet/fshij",
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

export const updateDepartamenti = createAsyncThunk(
  "departamentet/perditeso",
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

export const getDepartamenteNgaFakulteti = createAsyncThunk(
  "fakultetet/getdep",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await api.get(`fakulteti/${id}/departametet`);
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

const departamentiSlice = createSlice({
  name: "departamentet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shtoDepartament.pending, (state, action) => {
      //[shtoDepartament.pending]: (state, action) => {
      return {
        ...state,
        shtoDepartamenteStatus: "pending",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });
    // [shtoDepartament.fulfilled]: (state, action) => {
    builder.addCase(shtoDepartament.fulfilled, (state, action) => {
      // state.todos.push(action.payload);
      return {
        ...state,
        departamente: [action.payload, ...state.departamente],
        shtoDepartamenteStatus: "success",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });
    //[shtoDepartament.rejected]: (state, action) => {
    builder.addCase(shtoDepartament.rejected, (state, action) => {
      return {
        ...state,
        shtoDepartamenteStatus: "rejected",
        shtoDepartamenteError: action.payload,
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });
    builder.addCase(getDepartamente.pending, (state, action) => {
      //[getDepartamente.pending]: (state, action) => {
      return {
        ...state,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "pending",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });
    builder.addCase(getDepartamente.fulfilled, (state, action) => {
      //[getDepartamente.fulfilled]: (state, action) => {
      return {
        ...state,
        departamente: action.payload.result.items,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "success",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });
    //[getDepartamente.rejected]: (state, action) => {
    builder.addCase(getDepartamente.rejected, (state, action) => {
      return {
        ...state,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "rejected",
        getDepartamenteError: action.payload,
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });

    builder.addCase(getDepartamenteNgaFakulteti.pending, (state, action) => {
      return {
        ...state,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
        getFakulteteNgaDepStatus: "pending",
        getFakultetengaDepError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });
    builder.addCase(getDepartamenteNgaFakulteti.fulfilled, (state, action) => {
      return {
        ...state,
        departamentengafakulteti: action.payload.result.items,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        getFakulteteNgaDepStatus: "success",
        getFakultetengaDepError: "",
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });

    builder.addCase(getDepartamenteNgaFakulteti.rejected, (state, action) => {
      return {
        ...state,
        shtofakulteteStatus: "",
        shtofakulteteError: "",
        getFakulteteStatus: "",
        getFakulteteError: "",
        getFakulteteNgaDepStatus: "rejected",
        getFakultetengaDepError: action.payload,
        deleteFakultetiStatus: "",
        deleteFakultetiError: "",
        updateFakultetiStatus: "",
        updateFakultetiError: "",
      };
    });

    // [deleteDepartamenti.pending]: (state, action) => {
    builder.addCase(deleteDepartamenti.pending, (state, action) => {
      return {
        ...state,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "pending",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });
    //[deleteDepartamenti.fulfilled]: (state, action) => {
    builder.addCase(deleteDepartamenti.fulfilled, (state, action) => {
      const currentFakultete = state.departamente.filter(
        (fakultet) => fakultet.id !== action.payload.result.items.id
      );
      console.log(action.payload);
      return {
        ...state,
        departamente: currentFakultete,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "success",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });
    //[deleteDepartamenti.rejected]: (state, action) => {
    builder.addCase(deleteDepartamenti.rejected, (state, action) => {
      state = {
        ...state,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "rejected",
        deleteDepartamentiError: action.payload,
        updateDepartamentiStatus: "",
        updateDepartamentiError: "",
      };
    });
    // [updateDepartamenti.pending]: (state, action) => {
    builder.addCase(updateDepartamenti.pending, (state, action) => {
      return {
        ...state,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "pending",
        updateDepartamentiError: "",
      };
    });
    //[updateDepartamenti.fulfilled]: (state, action) => {
    builder.addCase(updateDepartamenti.fulfilled, (state, action) => {
      const updatedFakultete = state.departamente.map((fakultet) =>
        fakultet.id === action.payload.id ? action.payload : fakultet
      );
      console.log(updatedFakultete);
      return {
        ...state,
        departamente: updatedFakultete,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "success",
        updateDepartamentiError: "",
      };
    });
    // [updateDepartamenti.rejected]: (state, action) => {
    builder.addCase(updateDepartamenti.rejected, (state, action) => {
      return {
        ...state,
        shtoDepartamenteStatus: "",
        shtoDepartamenteError: "",
        getDepartamenteStatus: "",
        getDepartamenteError: "",
        deleteDepartamentiStatus: "",
        deleteDepartamentiError: "",
        updateDepartamentiStatus: "rejected",
        updateDepartamentiError: action.payload,
      };
    });
  },
});

export default departamentiSlice.reducer;
