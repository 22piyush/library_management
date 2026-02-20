import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBooks } from "../store/slices/bookSlice";
import { fetchAllBorrowedBook } from "../store/slices/borrowSlice";

function Catalog() {
  const dispatch = useDispatch();

  const { returnBookPopup } = useSelector((state) => state.popup);
  const { loading, error, message, userBorrowedBooks, allBorrowedBooks } =
    useSelector((state) => state.borrow);

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  });

  const overdueBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate;
  });

  const bookToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");
  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleAddBookPopup());
  }

  useEffect(()=>{
    if(message){
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBook());
    }
  })

  return <div>Catalog</div>;
}

export default Catalog;
