import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const borrowSlice = createSlice({
    name: "borrow",
    initialState: {
        loading: false,
        error: null,
        userBorrowedBooks: [],
        allBorrowedBooks: []
    },
    reducers: {

        

    }
});