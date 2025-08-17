import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { imageUpload } from '../../api/utils/utils';

const Register = () => {
  const { CreateUserWithEmailAndPassword, UpdateUserPhotoAndName } = useContext(AuthContext);
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectDistricts, setSelectDistricts] = useState("");
  const [selectUpazilas, setSelectUpazilas] = useState("");
  // const [filterDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];


  // fetch data from local 
  useEffect(() => {
    fetch("districts.json")
      .then(res => res.json())
      .then(data => {
        setDistricts(data)
      })
      .catch(() => toast.error("Failed to load districts"));


  }, []);

  useEffect(() => {
    fetch("upazilas.json")
      .then(res => res.json())
      .then(data => {
        setUpazilas(data)
      })
      .catch(() => toast.error("Failed to load upazilas"));
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Login||Human Blood Foundation"
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form?.name?.value;
    const email = form?.email?.value;

    // image upload 
    const image = form?.avatar?.files?.[0];
    const ImageUrl = await imageUpload(image);


    const bloodGroup = form?.bloodGroup?.value;
    const districtID = form?.district?.value;
    const districtObj = districts.find(d => d.id === districtID)
    const districtName = districtObj?.name;



    const upazila = form?.upazila?.value;
    const password = form?.password?.value;
    const confirmPassword = form?.confirm_password?.value;


    const role = "donor";
    const status = 'active';
    const created_at = new Date().toISOString();
    const last_logged_in = new Date().toISOString();



    const userRegisterData = { name, email, ImageUrl, bloodGroup, districtID, districtName, upazila, confirmPassword, role, status, created_at, last_logged_in };
    // console.log(userRegisterData)


    // register user 
    createUser(email, password, name, ImageUrl)

    // save date in the database 
    fetch(`${import.meta.env.VITE_server}users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userRegisterData)
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Data Save Successfully");
      })
      .catch(error => {
        console.log(error)
      })


  }

  const createUser = (email, password, name, photoURL) => {
    CreateUserWithEmailAndPassword(email, password)
      .then(() => {
        UpdateUserPhotoAndName(name, photoURL)
          .then(() => {
            toast.success("Account Create Successfully");
            navigate(location.state || "/");
          })
          .catch((error) => {
            toast.error("Account Create Unsuccessfully");
            console.log(error)
          })
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use. Please use a different email.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
        console.log(error)
      })
  }



  return (
    <div className='min-h-screen pt-30'>
      <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">Register as Donor</h2>
        <form onSubmit={handleSubmit} noValidate className='space-y-5'>
          {/* Name */}
          <input name="name" placeholder="Full Name" className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2" />

          {/* Email */}
          <input name="email" type="email" placeholder="Email" className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2" />

          {/* Avatar */}
          <input name="avatar" type="file" accept="image/*" className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2" />

          {/* Blood Group */}
          <select name="bloodGroup" className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2" defaultValue="">
            <option value="" disabled>Select blood group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>

          {/* District */}
          <select
            name="district"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2"
            value={selectDistricts}
            onChange={e => {
              setSelectDistricts(e.target.value);
              // Filter upazilas for selected district
              setFilteredUpazilas(upazilas.filter(u => u.district_id === e.target.value));
              setSelectUpazilas(""); // Reset upazila selection 
            }}
          >
            <option value="" disabled>Select district</option>
            {districts.map(dist => (
              <option key={dist.id} value={dist.id}>{dist.name}</option>
            ))}
          </select>

          {/* Upazila */}
          <select
            name="upazila"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2"
            value={selectUpazilas}
            onChange={e => setSelectUpazilas(e.target.value)}
            disabled={!selectDistricts}
          >
            <option value="" disabled>
              {selectDistricts ? "Select upazila" : "Select district first"}
            </option>
            {filteredUpazilas.map(upa => (
              <option key={upa.id} value={upa.name}>{upa.name}</option>
            ))}
          </select>

          {/* Password */}
          <input name="password" type="password" placeholder="Password" className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2" />

          {/* Confirm Password */}
          <input name="confirm_password" type="password" placeholder="Confirm Password" className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2" />

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
            {/* {loading ? "Registering..." : "Register"} */}
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-red-600 font-semibold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;