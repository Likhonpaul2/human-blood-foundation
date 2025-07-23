import { Link } from "react-router";
import { useEffect, useState } from "react";
import { MapPin, Droplet } from "lucide-react"; // optional: needs lucide-react or you can remove

const BloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}donation-requests?status=pending`)
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-red-700 mb-10 text-center">
        🩸 Pending Blood Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">No pending requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {req.recipientName}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{req.districtName} {req.upazila}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Droplet className="w-4 h-4 text-red-500" />
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {req.bloodGroup}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  <strong>Date:</strong> {req.donationDate}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Time:</strong>
                  {new Date(`${req.donationDate}T${req.donationTime}`).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>

              <Link
                to={`/donation-request/${req._id}`}
                className="mt-6 text-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition duration-300"
              >
                🔍 View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodDonationRequests;
