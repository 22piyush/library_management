import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import Header from "../layout/Header";

function MyBorrowedBooks() {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const [filter, setFilter] = useState("returned");

  // =========================
  // Open Read Popup
  // =========================
  const openReadPopup = (id) => {
    const selectedBook = books?.find((book) => book._id === id);
    setReadBook(selectedBook);
    dispatch(toggleReadBookPopup());
  };

  // =========================
  // Filtering
  // =========================
  const returnedBooks = userBorrowedBooks?.filter(
    (book) => book.returned === true
  );

  const nonReturnedBooks = userBorrowedBooks?.filter(
    (book) => book.returned === false
  );

  const booksToDisplay =
    filter === "returned" ? returnedBooks : nonReturnedBooks;

    console.log(booksToDisplay);
    

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Borrowed Books
        </h1>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter("returned")}
            className={`px-4 py-2 rounded font-semibold transition ${
              filter === "returned"
                ? "bg-green-600 text-white"
                : "bg-white border border-green-600 text-green-600"
            }`}
          >
            Returned Books
          </button>

          <button
            onClick={() => setFilter("notReturned")}
            className={`px-4 py-2 rounded font-semibold transition ${
              filter === "notReturned"
                ? "bg-red-600 text-white"
                : "bg-white border border-red-600 text-red-600"
            }`}
          >
            Non-Returned Books
          </button>
        </div>

        {/* Books Grid */}
        {booksToDisplay?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {booksToDisplay.map((borrowed) => (
              <div
                key={borrowed._id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {borrowed.bookTitle}
                </h2>

                <p className="text-gray-600 text-sm">
                  Borrowed On: {borrowed.borrowedAt}
                </p>

                <p className="text-gray-600 text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      borrowed.returned
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {borrowed.returned ? "Returned" : "Not Returned"}
                  </span>
                </p>

                <button
                  onClick={() => openReadPopup(borrowed.bookId)}
                  className="mt-4 bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Read Book
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No books available in this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBorrowedBooks;
