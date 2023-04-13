import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  plane:  [],
  shtoPlaneStatus: "",
  shtoPlaneError: "",
  getPlaneStatus: "",
  getPlaneError: "",
  getPlaneNgaFakStatus: "",
  getPlaneNgaFakError: "",
  deletePlaniStatus: "",
  deletePlaniError: "",
  updatePlaniStatus: "",
  updatePlaniError: "",
};

export const shtoPlan = createAsyncThunk(
  "planet/shto",
  async (plan, { rejectWithValue }) => {
    try {
      const response = await api.post("plani/", {
        emertimi: plan.emertimi,
        fakulteti: plan.fakulteti,
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

export const getPlane = createAsyncThunk(
  "planet/get",
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await api.get(`programi/${id}/plani`);
        return response.data;
      } else {
        const response = await api.get("plani");
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

export const deletePlani = createAsyncThunk(
  "planet/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`plani/${id}`);
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

export const updatePlani = createAsyncThunk(
  "planet/perditeso",
  async (plani, { rejectWithValue }) => {
    console.log(plani);
    try {
      const { id, emertimi, fakulteti } = plani;

      const response = await api.patch(`plani/${id}/`, {
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

const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shtoPlan.pending, (state, action) => {
      //[shtoPlan.pending]: (state, action) => {
      return {
        ...state,
        shtoPlaneStatus: "pending",
        shtoPlaneError: "",
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });
    // [shtoPlan.fulfilled]: (state, action) => {
    builder.addCase(shtoPlan.fulfilled, (state, action) => {
      //console.log(action.payload);
      sessionStorage.setItem("planet", JSON.stringify(action.payload.result.items));
      return {
        ...state,
        plane: [action.payload.result.items, ...state.plane],
        
        shtoPlaneStatus: "success",
        shtoPlaneError: "",
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });
    //[shtoPlan.rejected]: (state, action) => {
    builder.addCase(shtoPlan.rejected, (state, action) => {
      return {
        ...state,
        shtoPlaneStatus: "rejected",
        shtoPlaneError: action.payload,
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });
    builder.addCase(getPlane.pending, (state, action) => {
      //[getPlane.pending]: (state, action) => {
      return {
        ...state,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "pending",
        getPlaneError: "",
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });
    builder.addCase(getPlane.fulfilled, (state, action) => {
      //[getPlane.fulfilled]: (state, action) => {
        sessionStorage.setItem("planet", JSON.stringify(action.payload.result.items));
      return {
        ...state,
        plane: action.payload.result.items,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "success",
        getPlaneError: "",
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });
    //[getPlane.rejected]: (state, action) => {
    builder.addCase(getPlane.rejected, (state, action) => {
      return {
        ...state,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "rejected",
        getPlaneError: action.payload,
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });

    // [deletePlani.pending]: (state, action) => {
    builder.addCase(deletePlani.pending, (state, action) => {
      return {
        ...state,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "pending",
        deletePlaniError: "",
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });
    //[deletePlani.fulfilled]: (state, action) => {
    builder.addCase(deletePlani.fulfilled, (state, action) => {
      const currentDep = state.plane.filter(
        (plan) => plan.id !== action.payload.result.items.id
      );
      sessionStorage.setItem("planet", JSON.stringify(currentDep));
      return {
        ...state,
        plane: currentDep,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "success",
        deletePlaniError: "",
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });
    //[deletePlani.rejected]: (state, action) => {
    builder.addCase(deletePlani.rejected, (state, action) => {
      state = {
        ...state,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "rejected",
        deletePlaniError: action.payload,
        updatePlaniStatus: "",
        updatePlaniError: "",
      };
    });
    // [updatePlani.pending]: (state, action) => {
    builder.addCase(updatePlani.pending, (state, action) => {
      return {
        ...state,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "pending",
        updatePlaniError: "",
      };
    });
    //[updatePlani.fulfilled]: (state, action) => {
    builder.addCase(updatePlani.fulfilled, (state, action) => {
      const updatedPlane = state.plane.map((plan) =>
        plan.id === action.payload.result.items.id
          ? action.payload.result.items
          : plan
      );
      //console.log(updatedPlane);
      sessionStorage.setItem("planet", JSON.stringify(updatedPlane));
      return {
        ...state,
        plane: updatedPlane,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "success",
        updatePlaniError: "",
      };
    });
    // [updatePlani.rejected]: (state, action) => {
    builder.addCase(updatePlani.rejected, (state, action) => {
      return {
        ...state,
        shtoPlaneStatus: "",
        shtoPlaneError: "",
        getPlaneStatus: "",
        getPlaneError: "",
        deletePlaniStatus: "",
        deletePlaniError: "",
        updatePlaniStatus: "rejected",
        updatePlaniError: action.payload,
      };
    });
  },
});

export default planetSlice.reducer;
