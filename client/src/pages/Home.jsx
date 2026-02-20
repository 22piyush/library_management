import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../layout/Sidebar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");

  console.log(selectedComponent);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setSelectedComponent={setSelectedComponent}
      />

      <div className="flex-1 md:ml-64 relative">
        <div
          className="md:hidden z-10 absolute right-6 top-4 
        flex justify-center items-center bg-black rounded-md h-9 w-9 text-white"
        >
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {(() => {
          switch (selectedComponent) {
            case "Users":
              return user?.role === "Admin" ? <Users /> : null;
            case "Catalog":
              return user?.role === "Admin" ? <Catalog /> : null;
            case "Books":
              return <BookManagement />;
            case "Dashboard":
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
            case "My Borrowed Books":
              return user?.role === "User" ? <MyBorrowedBooks /> : null;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default Home;
