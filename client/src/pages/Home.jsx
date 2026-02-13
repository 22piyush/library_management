import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComponent, setselectedComponent] = useState("");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return <div>Home</div>;
}

export default Home;
