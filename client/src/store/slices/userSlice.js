import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchAllUsersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAllUsersSuccess(state, action) {
            state.loading = false;
            state.users = action.payload;
        },
        fetchAllUsersFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        addNewAdminRequest(state) {
            state.loading = true;
        },
        addNewAdminSuccess(state) {
            state.loading = false;
        },
        addNewAdminFailed(state) {
            state.loading = false;
        },
    },
});


export const fetchAllUsers = () => async (dispatch) => {
    try {
        dispatch(userSlice.actions.fetchAllUsersRequest());

        const { data } = await axios.get(
            "http://localhost:8080/api/v1/users/all",
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch(userSlice.actions.fetchAllUsersSuccess(data.users));
    } catch (error) {
        dispatch(
            userSlice.actions.fetchAllUsersFailed(
                error.response?.data?.message || "Something went wrong"
            )
        );
    }
};


export const addNewAdmin = (formData) => async (dispatch) => {
    try {
        dispatch(userSlice.actions.addNewAdminRequest());

        const { data } = await axios.post(
            "http://localhost:8080/api/v1/users/add/new-admin",  
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        dispatch(userSlice.actions.addNewAdminSuccess(data.message));
        toast.success(data.message);

    } catch (error) {
        dispatch(
            userSlice.actions.addNewAdminFailed(
                error.response?.data?.message || "Failed to add admin"
            )
        );
        toast.error(error);
    }
};



export default userSlice.reducer;
