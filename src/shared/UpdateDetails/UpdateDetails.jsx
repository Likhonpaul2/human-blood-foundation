import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const UpdateDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    useEffect(() => {
        fetch(`${import.meta.env.VITE_server}donation-requests/up/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData(data);
            })
            .catch(err => {
                toast.error("Failed to fetch data.");
                console.log(err)
            });
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_server}donation-requests-update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (result.modifiedCount > 0) {
                toast.success("Request updated successfully!");
                navigate('/dashboard/my-donation-requests');
            } else {
                toast("No changes made.");
            }
        } catch (error) {
            toast.error("Update failed.");
            console.log(error)
        }
    };

    if (!formData) return <div className="text-center mt-20 text-lg">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-lg mt-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-red-600">Update Donation Request</h2>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1 font-medium">Requester Name</label>
                    <input
                        type="text"
                        name="requesterName"
                        value={formData.requesterName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Requester Email</label>
                    <input
                        type="email"
                        name="requesterEmail"
                        value={formData.requesterEmail}
                        readOnly
                        className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Recipient Name</label>
                    <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">District</label>
                    <input
                        type="text"
                        name="districtId"
                        value={formData.districtId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Upazila</label>
                    <input
                        type="text"
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Hospital Name</label>
                    <input
                        type="text"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Full Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        <option value="" disabled>Select blood group</option>
                        {bloodGroups.map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Donation Date</label>
                    <input
                        type="date"
                        name="donationDate"
                        value={formData.donationDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Donation Time</label>
                    <input
                        type="time"
                        name="donationTime"
                        value={formData.donationTime}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none"
                    />
                </div>

                <div className="md:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                    >
                        Update Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDetails;
