import React, { useState } from "react";
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

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function UserDashboard() {
  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15],
        backgroundColor: "blue",
      },
    ],
  };

  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [] = useState(0)

  return (
    <div style={{ width: "500px" }}>
      <Bar data={data} />
    </div>
  );
}

export default UserDashboard;
