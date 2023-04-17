import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  planpermbajtja: [],
  shtoPlanpermbajtjeStatus: "",
  shtoPlanpermbajtjeError: "",
  getPlanpermbajtjeStatus: "",
  getPlanpermbajtjeError: "",
  getPlanpermbajtjeNgaFakStatus: "",
  getPlanpermbajtjeNgaFakError: "",
  deletePlanpermbajtjaStatus: "",
  deletePlanpermbajtjaError: "",
  updatePlanpermbajtjaStatus: "",
  updatePlanpermbajtjaError: "",
};

export const shtoPlan = createAsyncThunk(
  "planpermbajtjat/shto",
  async (plan, { rejectWithValue }) => {
    try {
      const response = await api.post("planpermbajtja/", plan);

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

export const getPlanpermbajtje = createAsyncThunk(
  "planpermbajtjat/get",
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await api.get(`plani/${id}/planpermbajtja`);
        return response.data;
      } else {
        const response = await api.get("planpermbajtja");
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

export const deletePlanpermbajtja = createAsyncThunk(
  "planpermbajtjat/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`planpermbajtja/${id}`);
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

export const updatePlanpermbajtja = createAsyncThunk(
  "planpermbajtjat/perditeso",
  async (planpermbajtja, { rejectWithValue }) => {
    console.log(planpermbajtja);
    try {
      const { id } = planpermbajtja;

      const response = await api.patch(`planpermbajtja/${id}/`, planpermbajtja
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

const planpermbajtjaSlice = createSlice({
  name: "planpermbajtjat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shtoPlan.pending, (state, action) => {
 
      return {
        ...state,
        shtoPlanpermbajtjeStatus: "pending",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });
    
    builder.addCase(shtoPlan.fulfilled, (state, action) => {
      //console.log(action.payload);
     
      return {
        ...state,
        planpermbajtja: [action.payload.result.items, ...state.planpermbajtja],

        shtoPlanpermbajtjeStatus: "success",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });
    //[shtoPlan.rejected]: (state, action) => {
    builder.addCase(shtoPlan.rejected, (state, action) => {
      return {
        ...state,
        shtoPlanpermbajtjeStatus: "rejected",
        shtoPlanpermbajtjeError: action.payload,
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });
    builder.addCase(getPlanpermbajtje.pending, (state, action) => {
      //[getPlanpermbajtje.pending]: (state, action) => {
      return {
        ...state,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "pending",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });
    builder.addCase(getPlanpermbajtje.fulfilled, (state, action) => {
      //[getPlanpermbajtje.fulfilled]: (state, action) => {
      sessionStorage.setItem(
        "planpermbajtjat",
        JSON.stringify(action.payload.result.items)
      );
      return {
        ...state,
        planpermbajtja: action.payload.result.items,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "success",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });
    //[getPlanpermbajtje.rejected]: (state, action) => {
    builder.addCase(getPlanpermbajtje.rejected, (state, action) => {
      return {
        ...state,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "rejected",
        getPlanpermbajtjeError: action.payload,
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });

    // [deletePlanpermbajtja.pending]: (state, action) => {
    builder.addCase(deletePlanpermbajtja.pending, (state, action) => {
      return {
        ...state,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "pending",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });
    //[deletePlanpermbajtja.fulfilled]: (state, action) => {
    builder.addCase(deletePlanpermbajtja.fulfilled, (state, action) => {
      const currentDep = state.planpermbajtja.filter(
        (plan) => plan.id !== action.payload.result.items.id
      );
      //sessionStorage.setItem("planpermbajtjat", JSON.stringify(currentDep));
      return {
        ...state,
        planpermbajtja: currentDep,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "success",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });
    //[deletePlanpermbajtja.rejected]: (state, action) => {
    builder.addCase(deletePlanpermbajtja.rejected, (state, action) => {
      state = {
        ...state,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "rejected",
        deletePlanpermbajtjaError: action.payload,
        updatePlanpermbajtjaStatus: "",
        updatePlanpermbajtjaError: "",
      };
    });
    // [updatePlanpermbajtja.pending]: (state, action) => {
    builder.addCase(updatePlanpermbajtja.pending, (state, action) => {
      return {
        ...state,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "pending",
        updatePlanpermbajtjaError: "",
      };
    });
    //[updatePlanpermbajtja.fulfilled]: (state, action) => {
    builder.addCase(updatePlanpermbajtja.fulfilled, (state, action) => {
      const updatedPlanpermbajtje = state.planpermbajtja.map((plan) =>
        plan.id === action.payload.result.items.id
          ? action.payload.result.items
          : plan
      );
      //console.log(updatedPlanpermbajtje);
      sessionStorage.setItem("planpermbajtjat", JSON.stringify(updatedPlanpermbajtje));
      return {
        ...state,
        planpermbajtja: updatedPlanpermbajtje,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "success",
        updatePlanpermbajtjaError: "",
      };
    });
    // [updatePlanpermbajtja.rejected]: (state, action) => {
    builder.addCase(updatePlanpermbajtja.rejected, (state, action) => {
      return {
        ...state,
        shtoPlanpermbajtjeStatus: "",
        shtoPlanpermbajtjeError: "",
        getPlanpermbajtjeStatus: "",
        getPlanpermbajtjeError: "",
        deletePlanpermbajtjaStatus: "",
        deletePlanpermbajtjaError: "",
        updatePlanpermbajtjaStatus: "rejected",
        updatePlanpermbajtjaError: action.payload,
      };
    });
  },
});

export default planpermbajtjaSlice.reducer;
