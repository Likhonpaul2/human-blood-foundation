import { useEffect, useState } from "react";
import { CircularProgress, 
         Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Select, MenuItem, Typography, Card, CardContent, FormControl, InputLabel } from "@mui/material";

const AllRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_server}total-blood-req`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch(`${import.meta.env.VITE_server}donation-requests-status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
      });
  };

  const filteredRequests =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <CircularProgress color="error" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All Blood Donation Requests 🩸
      </Typography>

      {/* Filter */}
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Status Filter</InputLabel>
        <Select
          value={filter}
          label="Status Filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="inprogress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>
      </FormControl>

      {/* Large Screen: Table */}
      <TableContainer component={Paper} sx={{ display: { xs: "none", lg: "block" } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Recipient</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Change Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((req) => (
              <TableRow key={req._id}>
                <TableCell>{req.recipientName}</TableCell>
                <TableCell>{req.hospitalName}</TableCell>
                <TableCell>{req.donationDate}</TableCell>
                <TableCell>{req.donationTime}</TableCell>
                <TableCell sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                  {req.status}
                </TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={req.status}
                    onChange={(e) => handleStatusChange(req._id, e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="inprogress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                    <MenuItem value="canceled">Canceled</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Small/Tablet Screen: Card View */}
      <div className="grid gap-4 lg:hidden">
        {filteredRequests.map((req) => (
          <Card key={req._id} variant="outlined">
            <CardContent>
              <Typography><b>Recipient:</b> {req.recipientName}</Typography>
              <Typography><b>Hospital:</b> {req.hospitalName}</Typography>
              <Typography><b>Date:</b> {req.donationDate}</Typography>
              <Typography><b>Time:</b> {req.donationTime}</Typography>
              <Typography sx={{ textTransform: "capitalize" }}>
                <b>Status:</b> {req.status}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Change Status</InputLabel>
                <Select
                  value={req.status}
                  label="Change Status"
                  onChange={(e) => handleStatusChange(req._id, e.target.value)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inprogress">In Progress</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                  <MenuItem value="canceled">Canceled</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllRequest;
