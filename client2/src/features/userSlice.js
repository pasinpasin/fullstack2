import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  perdorues: [],
  shtoUserStatus: "",
  shtoUserError: "",
  getUserStatus: "",
  getUserError: "",
  getSingleUserStatus: "",
  getSingleUserError: "",
  deleteUserStatus: "",
  deleteUserError: "",
  updateUserStatus: "",
  updateUserError: "",
  changeUserPasswordStatus: "",
  changeUserPasswordError: "",
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("users");
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

export const getSingleUser = createAsyncThunk(
  "users/getsingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`users/${id}`);
      console.log(response.data);
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

export const deleteUser = createAsyncThunk(
  "users/fshij",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`user/${id}/delete`);
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
  async (userData, { rejectWithValue }) => {
    const { id, user } = userData;
    console.log(userData);
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

export const changeUserPassword = createAsyncThunk(
  "users/perditesopassword",
  async (email, { rejectWithValue }) => {
    console.log(email);
    try {
      //const response = await api.patch(`resetpasswordbyadmin/${id}/`, {
      const response = await api.post(`password_reset/`, {
        email: email,
      });
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

export const selectPostById = (state, postId) =>
  state.perdorues.find((post) => post.id === postId);

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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });
    //[getUser.rejected]: (state, action) => {
    builder.addCase(getUser.rejected, (state, action) => {
      console.log(action);
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });
    //[deleteUser.fulfilled]: (state, action) => {
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log(action.payload);
      const currentUser = state.perdorues.filter(
        (user) => user.id !== action.payload.id
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });
    // [updateUser.pending]: (state, action) => {
    builder.addCase(updateUser.pending, (state, action) => {
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });
    //[updateUser.fulfilled]: (state, action) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload);
      const updatedUser = state.perdorues.map((user) =>
        user.id === action.payload.result.items.id
          ? action.payload.result.items
          : user
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
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
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });

    builder.addCase(getSingleUser.pending, (state, action) => {
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        getSingleUserStatus: "pending",
        getSinglUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });
    //[updateUser.fulfilled]: (state, action) => {
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      return {
        ...state,
        perdorues: action.payload.result.items,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        getSingleUserError: "",
        getSingleUserStatus: "success",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });

    builder.addCase(getSingleUser.rejected, (state, action) => {
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        getSingleUserError: action.payload,
        getSingleUserStatus: "",
        updateUserStatus: "",
        updateUserError: "",
        changeUserPasswordStatus: "",
        changeUserPasswordError: "",
      };
    });

    builder.addCase(changeUserPassword.pending, (state, action) => {
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        getSingleUserStatus: "",
        getSinglUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        changeUserPasswordStatus: "pending",
        changeUserPasswordError: "",
      };
    });
    //[updateUser.fulfilled]: (state, action) => {
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      console.log(action.payload);
      /*  const updatedUser = state.perdorues.map((user) =>
        user.id === action.payload.result.items.id
          ? action.payload.result.items
          : user
      ); */

      return {
        ...state,
        //perdorues: updatedUser,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        getSingleUserError: "",
        getSingleUserStatus: "",
        deleteUserStatus: "",
        deleteUserError: "",
        updateUserStatus: "",
        updateUserError: "",
        changeUserPasswordStatus: "success",
        changeUserPasswordError: "",
      };
    });

    builder.addCase(changeUserPassword.rejected, (state, action) => {
      return {
        ...state,
        shtoUserStatus: "",
        shtoUserError: "",
        getUserStatus: "",
        getUserError: "",
        deleteUserStatus: "",
        deleteUserError: "",
        getSingleUserError: "",
        getSingleUserStatus: "",
        updateUserStatus: "",
        updateUserError: "",
        changeUserPasswordStatus: "",
        changeUserPasswordError: "action.payload",
      };
    });
  },
});

export default userSlice.reducer;
