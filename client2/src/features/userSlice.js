import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  perdorues: [],
  shtoUserStatus: "",
  shtoUserError: "",
  getUserStatus: "",
  getUserError: "",
  deleteUserStatus: "",
  deleteUserError: "",
  updateUserStatus: "",
  updateUserError: "",
  redirectTo:false,
};

export const shtoUser = createAsyncThunk(
  "users/shto",
  async (newuser, { rejectWithValue }) => {
    try {
      const response = await api.post("users/", newuser);
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

export const getUser = createAsyncThunk(
  "users/get",
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        //const response = await api.get(`departamenti/${id}/users`);
        const response = await api.get(`users/${id}`);
        console.log(response.data);
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

export const deleteUser = createAsyncThunk(
  "users/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`users/${id}`);
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

export const updateUser = createAsyncThunk(
  "users/perditeso",
  async (user,id, { rejectWithValue }) => {
  console.log(user);
    try {
     

      const response = await api.patch(`users/${id}/`, user);
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

const userSlice = createSlice({
  name: "perdoruesit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shtoUser.pending, (state, action) => {
      
      return {
        ...state,
        shtoUserStatus: "pending",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:false,
      };
    });
   
    builder.addCase(shtoUser.fulfilled, (state, action) => {
     
      return {
        ...state,
        perdorues: [action.payload.result.items, ...state.perdorues],
        shtoUserStatus: "success",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:true,
      };
    });
    
    builder.addCase(shtoUser.rejected, (state, action) => {
      return {
        ...state,
        shtoUserStatus: "rejected",
        shtoUserError: action.payload,
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:false,
      };
    });
    builder.addCase(getUser.pending, (state, action) => {
     
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "pending",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:false,
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      //[getUser.fulfilled]: (state, action) => {
      return {
        ...state,
        perdorues: action.payload.result.items,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "success",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:false,
      };
    });
    //[getUser.rejected]: (state, action) => {
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "rejected",
        getUserError: action.payload,
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:false,
      };
    });

    // [deleteUser.pending]: (state, action) => {
    builder.addCase(deleteUser.pending, (state, action) => {
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "pending",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:false,
      };
    });
    //[deleteUser.fulfilled]: (state, action) => {
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const currentUser = state.perdorues.filter(
        (user) => user.id !== action.payload.result.items.id
      );

      return {
        ...state,
        perdorues: currentUser,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "success",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:false,
      };
    });
    //[deleteUser.rejected]: (state, action) => {
    builder.addCase(deleteUser.rejected, (state, action) => {
      state = {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "rejected",
        deleteUserError: action.payload,
        updateUserStatus: "",
        updateUserError: "",
        redirectTo:false,
      };
    });
    // [updateUser.pending]: (state, action) => {
    builder.addCase(updateUser.pending, (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "pending",
        updateUserError: "",
        redirectTo:false,
      };
    });
    //[updateUser.fulfilled]: (state, action) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload);
      const updatedUser = state.perdorues.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    
      return {
        ...state,
        perdorues: updatedUser,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "success",
        updateUserError: "",
        redirectTo:false,
      };
    });
    // [updateUser.rejected]: (state, action) => {
    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "rejected",
        updateUserError: action.payload,
        redirectTo:false,
      };
    });
  },
});

export default userSlice.reducer;
