import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const OverView = () => {
  const { user } = useContext(AuthContext);
  const [donationRequests, setDonationRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_server}donation-requests/email/${user?.email}`);
        const data = await res.json();
        setDonationRequests(data);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch donation requests:", error);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER}donation-requests-delete/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "Donation request has been deleted.", "success");
          setDonationRequests(prev => prev.filter(item => item._id !== id));
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/donation-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire("Updated!", `Status changed to ${status}`, "success");
        setDonationRequests((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Welcome back, {user?.displayName}!</h2>

      {donationRequests.length > 0 ?
        <>
          <h3 className="text-xl font-medium mb-2">Your Recent Donation Requests</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Blood</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donationRequests.slice(0, 3).map((req, index) => (
                  <tr key={req._id}>
                    <td>{index + 1}</td>
                    <td>{req.recipientName}</td>
                    <td>{req.district} {req.upazila}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td className="capitalize">{req.status}</td>
                    <td>
                      {req.status === "inprogress" && (
                        <div>
                          <p>{req.donorName}</p>
                          <p>{req.donorEmail}</p>
                        </div>
                      )}
                    </td>
                    <td className="flex flex-col gap-1">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(req._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => navigate(`/dashboard/donation-details/${req._id}`)}
                      >
                        View
                      </button>
                      {req.status === "inprogress" && (
                        <div className="flex gap-1 mt-1">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => updateStatus(req._id, "done")}
                          >
                            ✅ Done
                          </button>
                          <button
                            className="btn btn-xs btn-warning"
                            onClick={() => updateStatus(req._id, "canceled")}
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-right">
            <button
              className="btn btn-outline"
              onClick={() => navigate("/dashboard/my-donation-requests")}
            >
              View My All Requests
            </button>
          </div>
        </>

        :
        <>
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome, {user?.displayName}!</h2>
            <p className="text-gray-500 text-lg mb-4">You haven't created any donation request yet.</p>
            <button
              onClick={() => navigate("/dashboard/create-donation")}
              className="btn bg-red-600 text-white"
            >
              Create Donation Request
            </button>
          </div>
        </>}
    </div>
  );
};

export default OverView;
