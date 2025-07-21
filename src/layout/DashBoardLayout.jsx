import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';

const DashBoardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6">
                <h2 className="text-2xl font-bold mb-8 text-red-600">Dashboard</h2>
                <nav className="flex flex-col gap-4">
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