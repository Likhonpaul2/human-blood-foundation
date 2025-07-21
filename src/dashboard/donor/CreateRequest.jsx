import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateRequest = () => {
  const { user, userStatus} = useContext(AuthContext); // Assume userStatus has 'ACTIVE' or 'BLOCKED'
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [userData,setUserData] = useState({})
  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
    districtId: "",
    upazila: "",
  });



  useEffect(() => {
    // Fetch district list from DB or JSON
    fetch("/districts.json")
      .then(res => res.json())
      .then(data => setDistricts(data));
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      fetch("/upazilas.json")
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(u => u.district_id == selectedDistrictId);
          setUpazilas(filtered);
        });
    }
  }, [selectedDistrictId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "districtId") {
      setSelectedDistrictId(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // if (userStatus !== "active") {
    //   toast.error("Blocked users cannot create donation requests.");
    //   return;
    // }

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      ...formData,
      status: "pending",
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_server}donation-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationRequest),
      });

      if (res.ok) {
        console.log(res)
        toast.success("Donation request submitted!");
        setFormData({
          recipientName: "",
          hospitalName: "",
          address: "",
          bloodGroup: "",
          donationDate: "",
          donationTime: "",
          message: "",
          districtId: "",
          upazila: "",
        });
        setSelectedDistrictId("");
      } else {
        toast.error("Failed to create request");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Create Donation Request</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Read-only fields */}
        <input type="text" value={user?.displayName || ""} readOnly className="input" />
        <input type="email" value={user?.email || ""} readOnly className="input" />

        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          className="input"
          required
        />

        {/* District and Upazila */}
        <select
          name="districtId"
          value={formData.districtId}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select District</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          value={formData.upazila}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Upazila</option>
          {upazilas.map(u => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          className="input"
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map(bg => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="time"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          className="input"
          required
        />

        <textarea
          name="message"
          placeholder="Why do you need blood?"
          value={formData.message}
          onChange={handleChange}
          className="input col-span-1 md:col-span-2"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          disabled={userStatus !== "active"}
          className="col-span-1 md:col-span-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Request
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
