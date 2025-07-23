// DonationRequestDetails.jsx
import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
// import { AuthContext } from "../../providers/AuthProvider";

const DonationRequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Donation request ||Human Blood Foundation"
    }, [])

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetch(`${import.meta.env.VITE_server}donation-requests/${id}`)
                .then((res) => res.json())
                .then((data) => setRequest(data));
        }
    }, [id, user, navigate]);


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
            navigate("/"); // Or wherever you want to redirect

        }
    };

    if (!request) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>
            <div className="bg-white shadow-md p-4 rounded border">
                <p><strong>Recipient:</strong> {request.recipientName}</p>
                <p><strong>Hospital:</strong> {request.hospitalName}</p>
                <p><strong>Location:</strong> {request.districtName} {request.upazila}</p>
                <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                <p><strong>Date:</strong> {request.donationDate}</p>
                <p><strong>Time:</strong> {request.donationTime}</p>
                <p><strong>Message:</strong> {request.message}</p>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    Donate
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/10 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Confirm Donation</h3>
                        <p><strong>Your Name:</strong> {user.displayName}</p>
                        <p><strong>Your Email:</strong> {user.email}</p>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDonation}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationRequestDetails;
