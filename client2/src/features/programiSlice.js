import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  programe: [],
  shtoProgrameStatus: "",
  shtoProgrameError: "",
  getProgrameStatus: "",
  getProgrameError: "",
  deleteProgramiStatus: "",
  deleteProgramiError: "",
  updateProgramiStatus: "",
  updateProgramiError: "",
};

export const shtoProgram = createAsyncThunk(
  "programe/shto",
  async (program, { rejectWithValue }) => {
    try {
      const response = await api.post("programi/", {
        emertimi: program.emertimi,
        departamenti: program.departamenti,
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

export const getPrograme = createAsyncThunk(
  "programe/get",
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await api.get(`departamenti/${id}/programet`);
        console.log(response.data);
        return response.data;
      } else {
        const response = await api.get("programi");
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

export const deleteProgrami = createAsyncThunk(
  "programe/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`programi/${id}`);
      // console.log(response);
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

export const updateProgrami = createAsyncThunk(
  "programe/perditeso",
  async (programi, { rejectWithValue }) => {
    //console.log(programi);
    try {
      const { id, emertimi, departamenti } = programi;

      const response = await api.patch(`programi/${id}/`, {
        emertimi: emertimi,
        departamenti: departamenti,
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

const programiSlice = createSlice({
  name: "programet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shtoProgram.pending, (state, action) => {
      //[shtoProgram.pending]: (state, action) => {
      return {
        ...state,
        shtoProgrameStatus: "pending",
        shtoProgrameError: "",
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });
    // [shtoProgram.fulfilled]: (state, action) => {
    builder.addCase(shtoProgram.fulfilled, (state, action) => {
      //console.log(action.payload);
      return {
        ...state,
        programe: [action.payload.result.items, ...state.programe],
        shtoProgrameStatus: "success",
        shtoProgrameError: "",
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });
    //[shtoProgram.rejected]: (state, action) => {
    builder.addCase(shtoProgram.rejected, (state, action) => {
      return {
        ...state,
        shtoProgrameStatus: "rejected",
        shtoProgrameError: action.payload,
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });
    builder.addCase(getPrograme.pending, (state, action) => {
      //[getPrograme.pending]: (state, action) => {
      return {
        ...state,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "pending",
        getProgrameError: "",
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });
    builder.addCase(getPrograme.fulfilled, (state, action) => {
      //[getPrograme.fulfilled]: (state, action) => {
      return {
        ...state,
        programe: action.payload.result.items,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "success",
        getProgrameError: "",
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });
    //[getPrograme.rejected]: (state, action) => {
    builder.addCase(getPrograme.rejected, (state, action) => {
      return {
        ...state,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "rejected",
        getProgrameError: action.payload,
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });

    // [deleteProgrami.pending]: (state, action) => {
    builder.addCase(deleteProgrami.pending, (state, action) => {
      return {
        ...state,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "pending",
        deleteProgramiError: "",
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });
    //[deleteProgrami.fulfilled]: (state, action) => {
    builder.addCase(deleteProgrami.fulfilled, (state, action) => {
      const currentProg = state.programe.filter(
        (program) => program.id !== action.payload.result.items.id
      );

      return {
        ...state,
        programe: currentProg,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "success",
        deleteProgramiError: "",
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });
    //[deleteProgrami.rejected]: (state, action) => {
    builder.addCase(deleteProgrami.rejected, (state, action) => {
      state = {
        ...state,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "rejected",
        deleteProgramiError: action.payload,
        updateProgramiStatus: "",
        updateProgramiError: "",
      };
    });
    // [updateProgrami.pending]: (state, action) => {
    builder.addCase(updateProgrami.pending, (state, action) => {
      return {
        ...state,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "pending",
        updateProgramiError: "",
      };
    });
    //[updateProgrami.fulfilled]: (state, action) => {
    builder.addCase(updateProgrami.fulfilled, (state, action) => {
      console.log(action.payload);
      
      let depid=state.programe[0].departamenti.id
      const updatedPrograme = state.programe.map((program) =>
        program.id === action.payload.result.items.id
          ? action.payload.result.items
          : program
      );
      const filterd_programe = updatedPrograme.filter(prog => prog.departamenti.id===depid) ;

      console.log(filterd_programe);
      return {
        ...state,
        programe: filterd_programe,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "success",
        updateProgramiError: "",
      };
    });
    // [updateProgrami.rejected]: (state, action) => {
    builder.addCase(updateProgrami.rejected, (state, action) => {
      return {
        ...state,
        shtoProgrameStatus: "",
        shtoProgrameError: "",
        getProgrameStatus: "",
        getProgrameError: "",
        deleteProgramiStatus: "",
        deleteProgramiError: "",
        updateProgramiStatus: "rejected",
        updateProgramiError: action.payload,
      };
    });
  },
});

export default programiSlice.reducer;
