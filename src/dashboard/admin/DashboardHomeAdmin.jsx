import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Users, HandCoins, Droplets } from "lucide-react";

const DashboardHomeAdmin = () => {
    const { user } = useContext(AuthContext);
    const [donor, setDonor] = useState([]);
    const [bloodReq, setBloodReq] = useState([]);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_server}total-donors`)
            .then(res => res.json())
            .then(data => {
                setDonor(data);
            })

        fetch(`${import.meta.env.VITE_server}total-blood-req`)
            .then(res => res.json())
            .then(data => {
                setBloodReq(data);
            })



    }, [])
    return (
        <div>
            <div className="p-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName || "User"}! 👋</h2>
                    <p className="text-gray-600">Here's a quick overview of your blood donation platform.</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Users */}
                    <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold">{donor.length}</h4>
                                <p className="text-sm text-gray-600">Total Donors</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Funds */}
                    <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 text-green-600 p-3 rounded-full">
                                <HandCoins className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold">${0}</h4>
                                <p className="text-sm text-gray-600">Total Funds Donated</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Donation Requests */}
                    <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 text-red-600 p-3 rounded-full">
                                <Droplets className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold">{bloodReq.length}</h4>
                                <p className="text-sm text-gray-600">Total Blood Requests</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomeAdmin;