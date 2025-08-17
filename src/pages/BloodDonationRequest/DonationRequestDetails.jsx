import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const DonationRequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Donation Request | Human Blood Foundation";
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_server}donation-requests/${id}`)
            .then((res) => res.json())
            .then((data) => setRequest(data));
    }, [id, navigate]);

    const handleConfirmDonation = async () => {
        const res = await fetch(`${import.meta.env.VITE_server}donation-requests/donate/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                donorName: user.displayName,
                donorEmail: user.email,
            }),
        });

        const result = await res.json();
        if (result.modifiedCount) {
            toast.success("Donation confirmed!");
            setShowModal(false);
            navigate("/");
        }
    };

    if (!request) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen pt-30">
            <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
                🩸 Donation Request Details
            </h2>

            <div className="bg-white rounded-xl shadow-md p-6 border space-y-3">
                <div>
                    <p className="text-lg font-semibold text-gray-700">
                        <span className="text-gray-600">Recipient:</span> {request.recipientName}
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Hospital:</span> {request.hospitalName}
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Location:</span> {request.districtName}, {request.upazila}
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Blood Group:</span>{" "}
                        <span className="inline-block bg-red-100 text-red-700 font-semibold px-2 py-1 rounded-full text-sm">
                            {request.bloodGroup}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Date:</span> {request.donationDate}
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Time:</span> 
                        {new Date(`${request.donationDate}T${request.donationTime}`).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Message:</span> {request.message}
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
                >
                    ❤️ Donate Now
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-center mb-4">Confirm Donation</h3>
                        <div className="space-y-2 text-gray-700">
                            <p>
                                <strong>Your Name:</strong> {user.displayName}
                            </p>
                            <p>
                                <strong>Your Email:</strong> {user.email}
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDonation}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                            >
                                Confirm Donation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationRequestDetails;
