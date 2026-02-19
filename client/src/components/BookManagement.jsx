import React from "react";
import { useDispatch, useSelector } from "react-redux";

function BookManagement() {
  const dispatch = useDispatch();

  const { loading, error, message, books } = useSelector((state) => state.book);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);
  

  return <div>BookManagement</div>;
}

export default BookManagement;
