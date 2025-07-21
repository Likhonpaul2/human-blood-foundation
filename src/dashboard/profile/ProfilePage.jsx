import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  // fetch user info
  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}users/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setPreviewImage(data.ImageUrl);
      });
  }, [user?.email]);

  // fetch districts & upazilas
  useEffect(() => {
    fetch("/districts.json").then(res => res.json()).then(setDistricts);
    fetch("/upazilas.json").then(res => res.json()).then(setUpazilas);
  }, []);

  useEffect(() => {
    if (userData.districtId) {
      const filtered = upazilas.filter(u => u.district_id == userData.districtId);
      setFilteredUpazilas(filtered);
    }
  }, [userData.districtId, upazilas]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUserData(prev => ({ ...prev, newImage: file }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let imageUrl = userData.ImageUrl;

    if (userData.newImage) {
      const formData = new FormData();
      formData.append("image", userData.newImage);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) imageUrl = data.data.url;
    }

    const updatedData = {
      name: userData.name,
      bloodGroup: userData.bloodGroup,
      districtId: userData.districtId,
      districtName: districts.find(d => d.id == userData.districtId)?.name,
      upazila: userData.upazila,
      ImageUrl: imageUrl,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_server}users/${user?.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast.success("Profile updated!");
        setEditMode(false);
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#fdfaf7] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6 gap-2">
          <FaUserCircle className="text-3xl text-red-500" />
          <h1 className="text-3xl font-bold text-red-600">My Profile</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Profile picture */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            {editMode && (
              <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
            )}
            <img
              src={previewImage}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-red-400 shadow mx-auto"
            />
            <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
            <p className="text-red-600 uppercase text-sm font-semibold">{userData.role}</p>
            <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 mt-2 rounded-full uppercase">
              ACTIVE
            </span>
          </div>

          {/* Right: Profile info */}
          <div className="bg-white p-6 rounded-xl shadow-md relative">
            <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
            <FiEdit
              className="absolute top-6 right-6 text-gray-400 hover:text-black cursor-pointer"
              onClick={() => setEditMode(prev => !prev)}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-red-600">Name</label>
                {editMode ? (
                  <input
                    name="name"
                    value={userData.name || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                ) : (
                  <p className="text-lg font-semibold">{userData.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-red-600">Email</label>
                <p className="text-lg font-semibold">{userData.email}</p>
              </div>

              {/* District Select */}
              <div>
                <label className="text-sm text-red-600">District</label>
                {editMode ? (
                  <select
                    name="districtId"
                    value={userData.districtId || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select district</option>
                    {districts.map(dist => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-lg font-semibold">{userData.districtName}</p>
                )}
              </div>

              {/* Upazila Select */}
              <div>
                <label className="text-sm text-red-600">Upazila</label>
                {editMode ? (
                  <select
                    name="upazila"
                    value={userData.upazila || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select upazila</option>
                    {filteredUpazilas.map(upa => (
                      <option key={upa.id} value={upa.name}>
                        {upa.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-lg font-semibold">{userData.upazila}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-red-600">Blood Group</label>
                {editMode ? (
                  <select
                    name="bloodGroup"
                    value={userData.bloodGroup || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-lg font-semibold">{userData.bloodGroup}</p>
                )}
              </div>

              {editMode && (
                <button
                  type="submit"
                  className="w-full mt-4 bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700"
                >
                  Update Profile
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
