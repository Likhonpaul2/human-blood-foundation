import { useEffect, useState } from "react";

const SearchDonors = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [upazilas, setUpazilas] = useState([]);
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [donors, setDonors] = useState([]);

    // Load Districts & Upazilas
    useEffect(() => {
        fetch("districts.json")
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch("upazilas.json")
            .then(res => res.json())
            .then(data => setUpazilas(data));
    }, []);

    // Filter upazilas when district changes
    const filteredUpazilas = upazilas.filter(upz => upz.district_id === selectedDistrict);
    console.log(selectedDistrict)

    const handleSearch = async (e) => {
        e.preventDefault();
        // fetch donors from your backend based on filters
        const res = await fetch(`${import.meta.env.VITE_server}donors?bloodGroup=${bloodGroup}&districtID=${selectedDistrict}&upazila=${selectedUpazila}`);
        const data = await res.json();
        setDonors(data);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Search Blood Donors 🩸</h2>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="border rounded p-2"
                    required
                >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>

                <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="border rounded p-2"
                    required
                >
                    <option value="">Select District</option>
                    {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>

                <select
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    className="border rounded p-2"
                    required
                >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map(upz => (
                        <option key={upz.id} value={upz.name}>{upz.name}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="md:col-span-3 bg-red-600 text-white rounded py-2"
                >
                    Search Donors
                </button>
            </form>

            {/* Donor Results */}
            {donors.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4">Donors Found:</h3>
                    <div className="grid gap-4">
                        {donors.map((donor) => (
                            <div key={donor._id} className="border p-4 rounded shadow">
                                <p><strong>Name:</strong> {donor.name}</p>
                                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                                <p><strong>District:</strong> {donor.district}</p>
                                <p><strong>Upazila:</strong> {donor.upazila}</p>
                                <p><strong>Phone:</strong> {donor.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchDonors;
