import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

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
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <FaUserCircle size={45} className="text-gray-600" />
        <div>
          <h2 className="text-lg font-semibold">
            Welcome, {user?.name}
          </h2>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-semibold">{currentTime}</p>
          <p className="text-sm text-gray-500">{currentDate}</p>
        </div>
        <IoSettingsSharp onClick={()=> toggleSettingPopup()} size={28} className="text-gray-600 cursor-pointer hover:text-black transition" />
      </div>
    </header>
  );
}

export default Header;
