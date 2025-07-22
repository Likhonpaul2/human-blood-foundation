import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const DashBoardLayout = () => {

    const { user } = useContext(AuthContext);

    const [userRole, setUserRole] = useState({});


    useEffect(() => {
        fetch(`${import.meta.env.VITE_server}users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserRole(data);
            })
    }, [user?.email, userRole])





    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6">
                <h2 className="text-2xl font-bold mb-8 text-red-600">Dashboard</h2>
                <nav className="flex flex-col gap-4">



                    {/* donor  */}
                    {
                        userRole.role === "donor" &&
                        <>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                Overview
                            </NavLink>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                to="/dashboard/my-donation-requests"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                My Donations Requests
                            </NavLink>
                            <NavLink
                                to="/dashboard/create-donation"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                Create Donation Request
                            </NavLink>
                        </>
                    }


                    {/* admin  */}

                    {
                        userRole.role === "admin" &&
                        <>
                            <NavLink
                                to="/dashboard/admin"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                Admin Dashboard Home
                            </NavLink>
                            <NavLink
                                to="/dashboard/all-users"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                All Users
                            </NavLink>
                            <NavLink
                                to="/dashboard/all-blood-donation-request"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                All Blood Donation Request
                            </NavLink>
                            <NavLink
                                to="/dashboard/content-management"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                Content Management Page
                            </NavLink>

                        </>
                    }


                    {
                        userRole.role === "volunteer" &&
                        <>
                            <NavLink
                                to="/dashboard/volunteer"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                Dashboard Home
                            </NavLink>

                            <NavLink
                                to="/dashboard/all-blood-donation-request/volunteer"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                All Blood Donation Request
                            </NavLink>
                            <NavLink
                                to="/dashboard/content-management/volunteer"
                                className={({ isActive }) =>
                                    isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                                }
                            >
                                Content Management Page
                            </NavLink>

                        </>
                    }












                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                        }
                    >
                        Exit Dashboard
                    </NavLink>
                    {/* Add more links as needed */}
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashBoardLayout;