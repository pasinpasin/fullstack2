import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  departamente: JSON.parse(sessionStorage.getItem("departamentet")) || [],
  shtoDepartamenteStatus: "",
  shtoDepartamenteError: "",
  getDepartamenteStatus: "",
  getDepartamenteError: "",
  getDepartamenteNgaFakStatus: "",
  getDepartamenteNgaFakError: "",
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
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await api.get(`fakulteti/${id}/departamentet`);
        return response.data;
      } else {
        const response = await api.get("departamenti");
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

export const deleteDepartamenti = createAsyncThunk(
  "departamentet/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`departamenti/${id}`);
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
  async (departamenti, { rejectWithValue }) => {
    console.log(departamenti);
    try {
      const { id, emertimi, fakulteti } = departamenti;

      const response = await api.patch(`departamenti/${id}/`, {
        emertimi: emertimi,
        fakulteti: fakulteti
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
      //console.log(action.payload);
      sessionStorage.setItem("departamentet", JSON.stringify(action.payload.result.items));
      return {
        ...state,
        departamente: [action.payload.result.items, ...state.departamente],
        
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
        sessionStorage.setItem("departamentet", JSON.stringify(action.payload.result.items));
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
      const currentDep = state.departamente.filter(
        (departament) => departament.id !== action.payload.result.items.id
      );
      sessionStorage.setItem("departamentet", JSON.stringify(currentDep));
      return {
        ...state,
        departamente: currentDep,
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
      const updatedDepartamente = state.departamente.map((departament) =>
        departament.id === action.payload.result.items.id
          ? action.payload.result.items
          : departament
      );
      //console.log(updatedDepartamente);
      sessionStorage.setItem("departamentet", JSON.stringify(updatedDepartamente));
      return {
        ...state,
        departamente: updatedDepartamente,
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
