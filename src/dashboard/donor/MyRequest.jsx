import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const MyRequest = () => {
  const { user } = useContext(AuthContext);
  const [donationRequests, setDonationRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_server}donation-requests/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setDonationRequests(data);
        })
        .catch(() => toast.error("Failed to load data"));
    }
  }, [user?.email]);

  const filteredRequests =
    filter === "all"
      ? donationRequests
      : donationRequests.filter(item => item.status === filter);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="font-medium mr-2">Filter by status:</label>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Recipient</th>
              <th className="py-2 px-4">Blood Group</th>
              <th className="py-2 px-4">Hospital</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4">{req.recipientName}</td>
                  <td className="py-2 px-4">{req.bloodGroup}</td>
                  <td className="py-2 px-4">{req.hospitalName}</td>
                  <td className="py-2 px-4">{req.donationDate}</td>
                  <td className="py-2 px-4">{req.donationTime}</td>
                  <td className="py-2 px-4 capitalize">{req.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === idx + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyRequest;
