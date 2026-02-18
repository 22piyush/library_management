import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";


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
            state.loading = null;
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

    }
});