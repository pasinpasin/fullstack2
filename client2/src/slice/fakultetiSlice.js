import { createSlice } from '@reduxjs/toolkit'
import api from "../utils/api";

const slice = createSlice({
    name: 'fakultetet',
    initialState: {
        fakultetet: []
    },
    reducers: {
        fakultetSuccess: (state, action) => {
            state.fakultetet = action.payload;
            state.isLoading = false;
        },
    },
});

export default slice.reducer