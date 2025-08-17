import React, { useContext } from 'react';
import Logo from "../../assets/Logo/Logo.png";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, SignOut, userRole } = useContext(AuthContext);

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "hover:text-red-600"}>Home</NavLink></li>
      <li><NavLink to="/blood-donation-request" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "hover:text-red-600"}>Blood Requests</NavLink></li>
      <li><NavLink to="/search-donors" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "hover:text-red-600"}>Search Donors</NavLink></li>
      <li><NavLink to="/funding" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "hover:text-red-600"}>Support Us</NavLink></li>
      <li><NavLink to="/blogs" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "hover:text-red-600"}>Blog</NavLink></li>
    </>
  );

  const handleLogout = () => {
    SignOut()
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52 z-[100] font-semibold">
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-10" />
            <span className="text-xl font-bold text-red-600">Human Blood Foundation</span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3 font-medium">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-red-400">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2kR5zq0/default-avatar.png"}
                    alt="User"
                    className="object-cover"
                  />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-44 z-[100]">
                <li>
                  {userRole?.role === "admin" && <Link to="/dashboard/admin">Dashboard</Link>}
                  {userRole?.role === "volunteer" && <Link to="/dashboard/volunteer">Dashboard</Link>}
                  {!userRole?.role && <Link to="/dashboard">Dashboard</Link>}
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-600 hover:bg-red-100">Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
