import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const AllRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}total-blood-req`)
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch(`${import.meta.env.VITE_server}donation-requests-status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(() => {

        setRequests(prev =>
          prev.map(r => (r._id === id ? { ...r, status: newStatus } : r))
        );
      });
  };

  const filteredRequests =
    filter === "all" ? requests : requests.filter(r => r.status === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <FaSpinner className="animate-spin text-3xl text-red-500" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests 🩸</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Recipient</th>
              <th className="p-3">Hospital</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="p-3">{req.recipientName}</td>
                <td className="p-3">{req.hospitalName}</td>
                <td className="p-3">{req.donationDate}</td>
                <td className="p-3">{req.donationTime}</td>
                <td className="p-3 capitalize font-semibold">{req.status}</td>
                <td className="p-3">
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req._id, e.target.value)}
                    className="px-2 py-1 border rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequest;
