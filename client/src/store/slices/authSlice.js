import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        error: null,
        message: null,
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
        },
        registerFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload.message;
        },
    },
});


export const register = (data) => async(dispatch) => {
    dispatch(authSlice.actions.registerRequest());
    await axios.post("", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        dispatch(authSlice.actions.registerSuccess())
    });
}