import { useEffect, useState } from "react";

const SearchDonors = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Search Donors || Human Blood Foundation";
  }, []);

  useEffect(() => {
    fetch("districts.json")
      .then(res => res.json())
      .then(data => setDistricts(data));
    fetch("upazilas.json")
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  const filteredUpazilas = upazilas.filter(
    (upz) => upz.district_id === selectedDistrict
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_server}donors?bloodGroup=${bloodGroup}&districtID=${selectedDistrict}&upazila=${selectedUpazila}`
    );
    const data = await res.json();
    setDonors(data);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 min-h-screen pt-30">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-10">
        🩸 Search Blood Donors
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow"
      >
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:outline-none"
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:outline-none"
          required
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          value={selectedUpazila}
          onChange={(e) => setSelectedUpazila(e.target.value)}
          className="p-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:outline-none"
          required
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((upz) => (
            <option key={upz.id} value={upz.name}>
              {upz.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="md:col-span-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition duration-300 font-semibold"
        >
          🔍 Search Donors
        </button>
      </form>

      {/* Donor Results */}
      {donors.length > 0 ? (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">🔎 Donors Found</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
              >
                <p className="text-lg font-bold text-red-700">{donor.name}</p>
                <p>
                  <span className="font-medium text-gray-600">Blood Group:</span>{" "}
                  <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-semibold">
                    {donor.bloodGroup}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">District:</span>{" "}
                  {donor.districtName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Upazila:</span>{" "}
                  {donor.upazila}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center text-gray-500 font-medium">
          No donors found for your search.
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
