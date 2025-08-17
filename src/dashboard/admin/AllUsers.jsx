import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaUserShield, FaUserEdit, FaBan, FaCheck, FaEllipsisV } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}total-donors`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleBlockUnblock = (id, status) => {
    const newStatus = status === "active" ? "blocked" : "active";
    fetch(`${import.meta.env.VITE_server}update-status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setUsers((prev) =>
          prev.map((user) => (user._id === id ? { ...user, status: newStatus } : user))
        );
      });
    handleMenuClose();
  };

  const handleRoleChange = (id, role) => {
    fetch(`${import.meta.env.VITE_server}update-role/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then(() => {
        setUsers((prev) =>
          prev.map((user) => (user._id === id ? { ...user, role } : user))
        );
      });
    handleMenuClose();
  };

  const filteredUsers =
    filter === "all" ? users : users.filter((u) => u.status === filter);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        👥 All Users
      </Typography>

      {/* Filter */}
      <Box mb={3}>
        <FormControl size="small">
          <InputLabel >Status Filter</InputLabel>
          <Select
            native
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id} hover>
                <TableCell>
                  {user.ImageUrl ? (
                    <Avatar src={user.ImageUrl} alt={user.name} />
                  ) : (
                    <Avatar>{user.name?.charAt(0).toUpperCase()}</Avatar>
                  )}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {user.role}
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === "active" ? "success" : "error"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                    <FaEllipsisV />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedUser && (
          <>
            <MenuItem
              onClick={() =>
                handleBlockUnblock(selectedUser._id, selectedUser.status)
              }
            >
              {selectedUser.status === "active" ? (
                <>
                  <FaBan className="mr-2 text-red-500" /> Block
                </>
              ) : (
                <>
                  <FaCheck className="mr-2 text-green-500" /> Unblock
                </>
              )}
            </MenuItem>
            {selectedUser.role !== "volunteer" && (
              <MenuItem
                onClick={() => handleRoleChange(selectedUser._id, "volunteer")}
              >
                <FaUserEdit className="mr-2 text-blue-500" /> Make Volunteer
              </MenuItem>
            )}
            {selectedUser.role !== "admin" && (
              <MenuItem
                onClick={() => handleRoleChange(selectedUser._id, "admin")}
              >
                <FaUserShield className="mr-2 text-purple-500" /> Make Admin
              </MenuItem>
            )}
          </>
        )}
      </Menu>
    </Box>
  );
};

export default AllUsers;
