import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../layout/Sidebar";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComponent, setselectedComponent] = useState("");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
      <div
        className="md:hidden z-10 absolute right-6 top-4 sm:top-6 
        flex justify-center items-center bg-black rounded-md h-9 w-9 text-white"
      >
        <GiHamburgerMenu
          className="text-2xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setselectedComponent={selectedComponent}
      />

      {
        ()
      }

    </div>
  );
}

export default Home;
