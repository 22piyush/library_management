import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleReadBookPopup,
  toggleRecordBookPopup,
} from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import {
  fetchAllBorrowedBook,
  resetBorrowSlice,
} from "../store/slices/borrowSlice";

function BookManagement() {
  const dispatch = useDispatch();

  const { loading, error, message, books } = useSelector((state) => state.book);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector(
    (state) => state.popup,
  );

  const {
    loading: borrowSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = book.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const [borrowBookId, setBorrowBookId] = useState("");
  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };

  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBook());
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
    if (error || borrowSliceError) {
      toast.success(error || borrowSliceError);
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
  }, [
    dispatch,
    message,
    error,
    loading,
    borrowSliceError,
    borrowSliceLoading,
    borrowSliceMessage,
  ]);

  const [searchedKeyword, setSearchedKeyword] = useState("");

  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = book.filter((book) => {
    book.title.toLowerCase().includes(searchedKeyword);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Users Management
        </h1>
      </div>
    </div>
  );
}

export default BookManagement;
