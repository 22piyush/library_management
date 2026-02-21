import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Header from "../layout/Header";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminDashboard() {
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    if (users) setTotalUsers(users.length);
    if (books) setTotalBooks(books.length);

    if (allBorrowedBooks) {
      const borrowed = allBorrowedBooks.filter(
        (book) => book.returned === false
      );
      const returned = allBorrowedBooks.filter(
        (book) => book.returned === true
      );

      setTotalBorrowedBooks(borrowed.length);
      setTotalReturnedBooks(returned.length);
    }
  }, [users, books, allBorrowedBooks]);

  const chartData = {
    labels: [
      "Total Users",
      "Total Books",
      "Borrowed Books",
      "Returned Books",
    ],
    datasets: [
      {
        label: "Admin Statistics",
        data: [
          totalUsers,
          totalBooks,
          totalBorrowedBooks,
          totalReturnedBooks,
        ],
        backgroundColor: ["#6366F1", "#F59E0B", "#3B82F6", "#10B981"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {/* Users */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold text-indigo-600 mt-2">
              {totalUsers}
            </h2>
          </div>

          {/* Books */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500">Total Books</p>
            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {totalBooks}
            </h2>
          </div>

          {/* Borrowed */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500">Borrowed Books</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {totalBorrowedBooks}
            </h2>
          </div>

          {/* Returned */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500">Returned Books</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {totalReturnedBooks}
            </h2>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Overall Library Statistics
          </h2>

          <div className="w-full md:w-[700px]">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;