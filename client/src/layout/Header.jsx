import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes}:${ampm}`);

      const options = { month: "Short", dat: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };
  }, []);

  return <div>Header</div>;
}

export default Header;
