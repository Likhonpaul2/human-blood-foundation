import React, { useEffect, useState } from 'react';
import { FaUserShield, FaUserEdit, FaBan, FaCheck, FaEllipsisV } from 'react-icons/fa';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}total-donors`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleBlockUnblock = (id, status) => {
    const newStatus = status === "active" ? "blocked" : "active";
    fetch(`${import.meta.env.VITE_server}update-status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(() => {
        setUsers(prev =>
          prev.map(user => user._id === id ? { ...user, status: newStatus } : user)
        );
      });
  };

  const handleRoleChange = (id, role) => {
    fetch(`${import.meta.env.VITE_server}update-role/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    })
      .then(res => res.json())
      .then(() => {
        setUsers(prev =>
          prev.map(user => user._id === id ? { ...user, role } : user)
        );
      });
  };

  const filteredUsers = filter === "all" ? users : users.filter(u => u.status === filter);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">👥 All Users</h2>

      {/* Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <label className="font-medium text-gray-700 mr-2">Filter by status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Table View: Large Screens */}
      <div className="hidden lg:block rounded-lg shadow-lg bg-white overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 text-left">Avatar</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4">{renderAvatar(user)}</td>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4">{renderStatusBadge(user.status)}</td>
                <td className="p-4">
                  <DropdownMenu user={user} onBlockUnblock={handleBlockUnblock} onRoleChange={handleRoleChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View: Small/Tablet Screens */}
      <div className="lg:hidden grid gap-4">
        {filteredUsers.map(user => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-3">
              {renderAvatar(user)}
              <div>
                <div className="font-bold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="text-sm"><strong>Role:</strong> {user.role}</div>
            <div className="text-sm flex items-center gap-2">
              <strong>Status:</strong> {renderStatusBadge(user.status)}
            </div>
            <div className="text-right">
              <DropdownMenu user={user} onBlockUnblock={handleBlockUnblock} onRoleChange={handleRoleChange} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable Avatar
const renderAvatar = (user) => {
  return user.ImageUrl ? (
    <img src={user.ImageUrl} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
      {user.name?.charAt(0).toUpperCase()}
    </div>
  );
};

// Reusable Status Badge
const renderStatusBadge = (status) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
    status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  }`}>
    {status}
  </span>
);

// Dropdown Menu
const DropdownMenu = ({ user, onBlockUnblock, onRoleChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="p-2 rounded-full hover:bg-gray-100">
        <FaEllipsisV />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 bg-white border rounded-md shadow-lg overflow-hidden animate-fade-in">
          <ul className="text-sm text-gray-700">
            <li>
              <button
                onClick={() => { onBlockUnblock(user._id, user.status); setOpen(false); }}
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 gap-2"
              >
                {user.status === "active" ? (
                  <>
                    <FaBan className="text-red-500" /> Block
                  </>
                ) : (
                  <>
                    <FaCheck className="text-green-500" /> Unblock
                  </>
                )}
              </button>
            </li>
            {user.role !== "volunteer" && (
              <li>
                <button
                  onClick={() => { onRoleChange(user._id, "volunteer"); setOpen(false); }}
                  className="w-full flex items-center px-4 py-2 hover:bg-gray-100 gap-2"
                >
                  <FaUserEdit className="text-blue-500" /> Make Volunteer
                </button>
              </li>
            )}
            {user.role !== "admin" && (
              <li>
                <button
                  onClick={() => { onRoleChange(user._id, "admin"); setOpen(false); }}
                  className="w-full flex items-center px-4 py-2 hover:bg-gray-100 gap-2"
                >
                  <FaUserShield className="text-purple-500" /> Make Admin
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
