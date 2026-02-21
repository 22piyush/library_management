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

function UserDashboard() {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const borrowed = userBorrowedBooks.filter(
      (book) => book.returned === false,
    );

    const returned = userBorrowedBooks.filter((book) => book.returned === true);

    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);
  }, [userBorrowedBooks]);

  const chartData = {
    labels: ["Borrowed Books", "Returned Books"],
    datasets: [
      {
        label: "Library Statistics",
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#6366F1", "#10B981"],
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
          User Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Borrowed Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500">Total Borrowed Books</p>
            <h2 className="text-3xl font-bold text-indigo-600 mt-2">
              {totalBorrowedBooks}
            </h2>
          </div>

          {/* Returned Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500">Total Returned Books</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {totalReturnedBooks}
            </h2>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Borrow Statistics
          </h2>

          <div className="w-full md:w-[600px]">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
