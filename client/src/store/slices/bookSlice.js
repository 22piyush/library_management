import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers: {
        fetchBooksRequest(state) { },
        fetchBooksSuccess(state) { },
        fetchBooksFailed(state) { },
    }
})