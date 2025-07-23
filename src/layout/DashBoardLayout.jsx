import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import {
  FaTachometerAlt,
  FaUser,
  FaListAlt,
  FaPlusCircle,
  FaUsers,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaClipboardList
} from 'react-icons/fa';

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserRole(data));
  }, [user?.email]);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-1 rounded transition ${
      isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-600'
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed z-30 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out w-64 bg-white shadow-md p-6 lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Dashboard</h2>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {/* Donor Links */}
          {userRole.role === "donor" && (
            <>
              <NavLink to="/dashboard" className={navItemClass}>
                <FaTachometerAlt /> Overview
              </NavLink>
              <NavLink to="/dashboard/profile" className={navItemClass}>
                <FaUser /> Profile
              </NavLink>
              <NavLink to="/dashboard/my-donation-requests" className={navItemClass}>
                <FaListAlt /> My Donation Requests
              </NavLink>
              <NavLink to="/dashboard/create-donation" className={navItemClass}>
                <FaPlusCircle /> Create Donation Request
              </NavLink>
            </>
          )}

          {/* Admin Links */}
          {userRole.role === "admin" && (
            <>
              <NavLink to="/dashboard/admin" className={navItemClass}>
                <FaTachometerAlt /> Admin Dashboard
              </NavLink>
              <NavLink to="/dashboard/all-users" className={navItemClass}>
                <FaUsers /> All Users
              </NavLink>
              <NavLink to="/dashboard/all-blood-donation-request" className={navItemClass}>
                <FaClipboardList /> All Blood Requests
              </NavLink>
              <NavLink to="/dashboard/content-management" className={navItemClass}>
                <FaFileAlt /> Content Management
              </NavLink>
            </>
          )}

          {/* Volunteer Links */}
          {userRole.role === "volunteer" && (
            <>
              <NavLink to="/dashboard/volunteer" className={navItemClass}>
                <FaTachometerAlt /> Volunteer Dashboard
              </NavLink>
              <NavLink to="/dashboard/all-blood-donation-request/volunteer" className={navItemClass}>
                <FaClipboardList /> All Blood Requests
              </NavLink>
              <NavLink to="/dashboard/content-management/volunteer" className={navItemClass}>
                <FaFileAlt /> Content Management
              </NavLink>
            </>
          )}

          {/* Common Link */}
          <NavLink to="/" className={navItemClass}>
            <FaSignOutAlt /> Exit Dashboard
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="lg:hidden p-4 bg-white shadow flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-600">Dashboard</h2>
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>
        </div>

        {/* Main Content Outlet */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
