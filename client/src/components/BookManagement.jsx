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
import Header from "../layout/Header";
import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";

function BookManagement() {
  const dispatch = useDispatch();

  // Book slice
  const { loading, error, message, books } = useSelector((state) => state.book);

  // Auth slice
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Popup slice
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector(
    (state) => state.popup,
  );

  // Borrow slice
  const {
    loading: borrowSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const [borrowBookId, setBorrowBookId] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState("");

  // ===============================
  // Open Read Popup
  // ===============================
  const openReadPopup = (id) => {
    const selectedBook = books?.find((book) => book._id === id);
    setReadBook(selectedBook);
    dispatch(toggleReadBookPopup());
  };

  // ===============================
  // Open Record Borrow Popup
  // ===============================
  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };

  // ===============================
  // Handle Search
  // ===============================
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = books?.filter((book) =>
    book.title?.toLowerCase().includes(searchedKeyword),
  );

  // ===============================
  // Handle Messages & Errors
  // ===============================
  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBook());
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }

    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
  }, [dispatch, message, error, borrowSliceError, borrowSliceMessage]);

  // ===============================
  // Fetch books on mount
  // ===============================
  useEffect(() => {
    dispatch(fetchAllBooks());
    dispatch(fetchAllBorrowedBook());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Book Management
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchedKeyword}
          onChange={handleSearch}
          className="mb-6 p-2 border rounded w-full"
        />

        {/* Books List */}
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searchedBooks?.length > 0 ? (
              searchedBooks.map((book) => (
                <div key={book._id} className="bg-white p-4 rounded shadow">
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-gray-600">Author: {book.author}</p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openReadPopup(book._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Read
                    </button>

                    <button
                      onClick={() => openRecordBookPopup(book._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Record Borrow
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        )}
      </div>

      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup book={readBook}/>}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
    </div>
  );
}

export default BookManagement;
