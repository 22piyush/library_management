import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import {
  fetchAllBorrowedBook,
  resetBorrowSlice,
} from "../store/slices/borrowSlice";

function Catalog() {
  const dispatch = useDispatch();

  const { loading, error, message, allBorrowedBooks } =
    useSelector((state) => state.borrow);

  const [filter, setFilter] = useState("borrowed");
  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  });

  const overdueBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate;
  });

  const bookToDisplay =
    filter === "borrowed" ? borrowedBooks : overdueBooks;

  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleAddBookPopup());
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBook());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, message, error]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Borrowed Books Catalog
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter("borrowed")}
          className={`px-6 py-2 rounded-lg font-semibold ${
            filter === "borrowed"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Borrowed Books
        </button>

        <button
          onClick={() => setFilter("overdue")}
          className={`px-6 py-2 rounded-lg font-semibold ${
            filter === "overdue"
              ? "bg-red-600 text-white"
              : "bg-white border"
          }`}
        >
          Overdue Books
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Book</th>
              <th className="p-4">Borrow Date</th>
              <th className="p-4">Due Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookToDisplay?.length > 0 ? (
              bookToDisplay.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{item.userName}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.bookTitle}</td>
                  <td className="p-4">
                    {new Date(item.borrowDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-4 ${
                      filter === "overdue"
                        ? "text-red-600 font-bold"
                        : ""
                    }`}
                  >
                    {new Date(item.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        openReturnBookPopup(item._id, item.email)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="flex justify-center mt-6">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}

export default Catalog;