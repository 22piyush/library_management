import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const borrowSlice = createSlice({
    name: "borrow",
    initialState: {
        loading: false,
        error: null,
        message: null,
        userBorrowedBooks: [],
        allBorrowedBooks: []
    },
    reducers: {

        fetchUserBorrowedBooksRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchUserBorrowedBooksSuccess(state, action) {
            state.loading = false;
            state.userBorrowedBooks = action.payload;
        },
        fetchUserBorrowedBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },



        recordBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },

        recordBookSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },

        recordBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },



        fetchAllBorrowedBooksRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchAllBorrowedBooksSuccess(state, action) {
            state.loading = false;
            state.allBorrowedBooks = action.payload;
        },
        fetchAllBorrowedBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },



        returnBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },

        returnBookSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },

        returnBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

    }
});