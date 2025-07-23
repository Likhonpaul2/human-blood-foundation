// BloodDonationRequests.jsx (Public Page)
import { Link } from "react-router";
import { useEffect, useState } from "react";

const BloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}donation-requests?status=pending`)
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Pending Blood Donation Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req._id} className="bg-white p-5 shadow-md rounded-md border">
              <h3 className="font-bold text-lg">{req.recipientName}</h3>
              <p><strong>Location:</strong> {req.districtName}, {req.upazila}</p>
              <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
              <p><strong>Date:</strong> {req.date}</p>
              <p><strong>Time:</strong> {req.time}</p>
              <Link
                to={`/donation-request/${req._id}`}
                className="mt-3 inline-block text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodDonationRequests;
