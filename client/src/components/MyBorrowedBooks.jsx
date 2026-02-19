import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";

function MyBorrowedBooks() {
  const dispatch = useDispatch();

  // Book slice
  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const { readBookPopup } = useSelector((state) => state.popup);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const selectedBook = books?.find((book) => book._id === id);
    setReadBook(selectedBook);
    dispatch(toggleReadBookPopup());
  };

  const [filter, setFilter] = useState("returned");
  const returnedBooks = userBorrowedBooks?.filter((book) => {
    return book.returned === true;
  });

  const nonReturnedBooks = userBorrowedBooks?.filter((book) => {
    return book.returned === false;
  });

  const booksToDisplay = filter === "return" ? returnedBooks : nonReturnedBooks;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Borrowed Books
        </h1>
      </div>
    </div>
  );
}

export default MyBorrowedBooks;
