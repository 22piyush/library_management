import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {

    const updateDateTime = () => {

      const now = new Date();
      const hours = now.getHours();

    };
    
  }, []);

  return <div>Header</div>;
}

export default Header;
