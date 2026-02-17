import React, { useEffect } from "react";
import { FaSignOutAlt as LogoutIcon } from "react-icons/fa";
import { MdDashboard as DashboardIcon } from "react-icons/md";
import { FaBook as BookIcon } from "react-icons/fa";
import { GiBookshelf as CatalogIcon } from "react-icons/gi";
import { FaUsers as UsersIcon } from "react-icons/fa";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { BiBookContent as LogoWithTitle } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";

function Sidebar({ isSidebarOpen, setIsSidebarOpen, setSelectedComponent }) {
  const dispatch = useDispatch();

  const { addNewAdminPopup, settingPopup } = useSelector(
    (state) => state.popup,
  );
  
  const { error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message]);

  const menuItemClass =
    "flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer";

  return (
    <>
      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-black text-white 
        transition-all duration-500 z-20
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ position: "fixed" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <LogoWithTitle className="text-2xl" />
            <span>BookWare</span>
          </div>

          <CloseIcon
            className="text-xl cursor-pointer md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <RiAdminFill className="text-xl" />
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-400">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col mt-4">
          {/* Dashboard */}
          <div
            className={menuItemClass}
            onClick={() => {
              setSelectedComponent("Dashboard");
              setIsSidebarOpen(false);
            }}
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </div>

          {/* Books */}
          <div
            className={menuItemClass}
            onClick={() => {
              setSelectedComponent("Books");
              setIsSidebarOpen(false);
            }}
          >
            <BookIcon />
            <span>Books</span>
          </div>

          {/* Admin Only */}
          {isAuthenticated && user?.role === "Admin" && (
            <>
              <div
                className={menuItemClass}
                onClick={() => {
                  setSelectedComponent("Catalog");
                  setIsSidebarOpen(false);
                }}
              >
                <CatalogIcon />
                <span>Catalog</span>
              </div>

              <div
                className={menuItemClass}
                onClick={() => {
                  setSelectedComponent("Users");
                  setIsSidebarOpen(false);
                }}
              >
                <UsersIcon />
                <span>Users</span>
              </div>

              <div
                className={menuItemClass}
                onClick={() => dispatch(toggleAddNewAdminPopup())}
              >
                <RiAdminFill />
                <span>Add New Admin</span>
              </div>
            </>
          )}

          {/* User Only */}
          {isAuthenticated && user?.role === "User" && (
            <div
              className={menuItemClass}
              onClick={() => {
                setSelectedComponent("My Borrowed Books");
                setIsSidebarOpen(false);
              }}
            >
              <BookIcon />
              <span>My Borrowed Books</span>
            </div>

            // dispatch(toggleSettingPopup())
          )}

          {/* Logout */}
          <div
            className={`${menuItemClass} absolute w-full bottom-0 border-t border-gray-700 `}
            onClick={handleLogout}
          >
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
}

export default Sidebar;
