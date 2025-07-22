import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const MyRequest = () => {
  const { user } = useContext(AuthContext);
  const [donationRequests, setDonationRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_server}donation-requests-delete/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success("Request deleted");
          setDonationRequests(prev => prev.filter(item => item._id !== id));
          setShowDeleteModal(false);
        }
      });
  };

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
              <th className="py-2 px-4">Actions</th>
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
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedRequest(req);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRequest(req);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
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

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Donation Request Details</h3>
            <p><strong>Recipient:</strong> {selectedRequest.recipientName}</p>
            <p><strong>Blood Group:</strong> {selectedRequest.bloodGroup}</p>
            <p><strong>Hospital:</strong> {selectedRequest.hospitalName}</p>
            <p><strong>District:</strong> {selectedRequest.districtId}</p>
            <p><strong>Upazila:</strong> {selectedRequest.upazila}</p>
            <p><strong>Message:</strong> {selectedRequest.message}</p>
            <p><strong>Date:</strong> {selectedRequest.donationDate}</p>
            <p><strong>Time:</strong> {selectedRequest.donationTime}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <p>Do you really want to delete the request for <strong>{selectedRequest.recipientName}</strong>?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => handleDelete(selectedRequest._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequest;
