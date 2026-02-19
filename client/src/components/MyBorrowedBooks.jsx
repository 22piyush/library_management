import React from "react";
import { useDispatch, useSelector } from "react-redux";

function MyBorrowedBooks() {
  const dispatch = useDispatch();

  // Book slice
  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  return <div>MyBorrowedBooks</div>;
}

export default MyBorrowedBooks;
