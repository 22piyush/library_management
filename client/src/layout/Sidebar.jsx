import React, { useEffect } from "react";

import { FaSignOutAlt as logoutIcon } from "react-icons/fa";
import { MdDashboard as dashboardIcon } from "react-icons/md";
import { FaBook as bookIcon } from "react-icons/fa";
import { GiBookshelf as catalogIcon } from "react-icons/gi";
import { MdSettings as settingIcon } from "react-icons/md";
import { FaUsers as usersIcon } from "react-icons/fa";
import { AiOutlineClose as closeIcon } from "react-icons/ai";
import { BiBookContent as logo_with_title } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

function Sidebar({ isSidebarOpen, setIsSidebarOpen, setselectedComponent }) {
  const dispatch = useDispatch();
  // const {} = useSelector();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const handlelogout = () => {
    dispatch(logout);
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
  }, [dispatch, isAuthenticated, error, loading, message]);

  return (
    <div>
      <aside className={`${isSidebarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full `} >

          dfadf
      </aside>
    </div>
  );
}

export default Sidebar;
