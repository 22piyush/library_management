import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Time
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";

      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      // Date
      const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };

      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">
      {/* LFT SIDE  */}
      <div></div>

      {/* RIGHT SIDE  */}
      <div></div>
    </header>
  );
}

export default Header;
