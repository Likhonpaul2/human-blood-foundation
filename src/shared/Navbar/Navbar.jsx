import React, { useContext } from 'react';
import Logo from "../../assets/Logo/Logo.png"
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, SignOut } = useContext(AuthContext);

    const navLinks = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-[#FF5757]" : ""
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/blood-requests"
                className={({ isActive }) =>
                    isActive ? "text-[#FF5757]" : ""
                }
            >
                Blood Requests
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/search-donors"
                className={({ isActive }) =>
                    isActive ? "text-[#FF5757]" : ""
                }
            >
                Search Donors
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/support-us"
                className={({ isActive }) =>
                    isActive ? "text-[#FF5757]" : ""
                }
            >
                Support Us
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/blog"
                className={({ isActive }) =>
                    isActive ? "text-[#FF5757]" : ""
                }
            >
                Blog
            </NavLink>
        </li>

    </>

    const handleLogout = () => {
        SignOut()
            .then(() => {
                toast.success("Logout Successfully")
            })
            .catch((err) => console.error(err));
    }

    return (
        <div>
            <div className="navbar bg-base-100 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-bold">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/"><img src={Logo} alt="Logo" className='w-10' /></Link>
                    <Link to="/" className="text-xl ml-2 font-bold">Human Blood Foundation</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold">
                        {navLinks}
                    </ul>
                </div>
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border-2 border-orange-400">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/2kR5zq0/default-avatar.png"}
                                    alt="User"
                                    className="object-cover"
                                />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">
                            <li>
                                <Link to="/dashboard" className="justify-between">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className='bg-red-600/20'>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;