import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Catalog() {
  const dispatch = useDispatch();

  const { returnBookPopup } = useSelector((state) => state.popup);
  const { loading, error, message, userBorrowedBooks, allBorrowedBooks } = useSelector((state) => state.borrow);

  const currentDate = new Date();

  const 

  return <div>Catalog</div>;
}

export default Catalog;
