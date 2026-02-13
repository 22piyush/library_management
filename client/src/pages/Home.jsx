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
  const [selectedComponent, setselectedComponent] = useState("");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // if (!isAuthenticated) {
  //   return <Navigate to={"/login"} />;
  // }

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

      {(() => {
        switch (selectedComponent) {
          case "Dashboard":
            return user?.role === "User" ? (
              <UserDashboard />
            ) : (
              <AdminDashboard />
            );

          case "Books":
            return <BookManagement />;

          case "Catalog":
            return user?.role === "Admin" ? <Catalog /> : null;

          case "Users":
            return user?.role === "Admin" ? <Users /> : null;

          case "My Borrowed Books":
            return user?.role === "User" ? <MyBorrowedBooks /> : null;

          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Home;
