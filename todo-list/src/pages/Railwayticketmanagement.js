import React, { useState } from "react";
import Swal from "sweetalert2";

const RailwayTicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    passengerName: "",
    trainNumber: "",
    classType: "",
    destination: "",
    departureDate: "",
    seatNumber: "",
    notes: "",
  });

  const classTypes = ["First Class", "Sleeper", "General"];
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Ticket deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const ticket = tickets.find((tick) => tick.id === id);
    setFormData(ticket);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const ticket = tickets.find((tick) => tick.id === id);
    Swal.fire({
      title: "Ticket Details",
      html: `
        <strong>Passenger Name:</strong> ${ticket.passengerName}<br>
        <strong>Train Number:</strong> ${ticket.trainNumber}<br>
        <strong>Class Type:</strong> ${ticket.classType}<br>
        <strong>Destination:</strong> ${ticket.destination}<br>
        <strong>Departure Date:</strong> ${ticket.departureDate}<br>
        <strong>Seat Number:</strong> ${ticket.seatNumber}<br>
        <strong>Notes:</strong> ${ticket.notes}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.passengerName) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Passenger name is required." });
      return;
    }
    if (!formData.trainNumber) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Train number is required." });
      return;
    }
    if (!formData.classType) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Class type is required." });
      return;
    }
    if (!formData.destination) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Destination is required." });
      return;
    }

    if (!isEditing) {
      setTickets([...tickets, { ...formData, id: Date.now() }]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Ticket added successfully!",
      });
    } else {
      setTickets(
        tickets.map((ticket) =>
          ticket.id === editingId ? { ...formData, id: editingId } : ticket
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Ticket updated successfully!",
      });
    }

    setFormData({
      passengerName: "",
      trainNumber: "",
      classType: "",
      destination: "",
      departureDate: "",
      seatNumber: "",
      notes: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Railway Ticket Management System</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Passenger Name:</label>
          <input
            type="text"
            className="form-control"
            name="passengerName"
            value={formData.passengerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Train Number:</label>
          <input
            type="text"
            className="form-control"
            name="trainNumber"
            value={formData.trainNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Class Type:</label>
          <select
            className="form-select"
            name="classType"
            value={formData.classType}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Class
            </option>
            {classTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Destination:</label>
          <input
            type="text"
            className="form-control"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Departure Date:</label>
          <input
            type="date"
            className="form-control"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Seat Number:</label>
          <input
            type="text"
            className="form-control"
            name="seatNumber"
            value={formData.seatNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes:</label>
          <textarea
            className="form-control"
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Ticket" : "Add Ticket"}
        </button>
      </form>

      <h2 className="mt-5">Ticket List</h2>
      {tickets.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Passenger Name</th>
              <th>Train Number</th>
              <th>Class Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.passengerName}</td>
                <td>{ticket.trainNumber}</td>
                <td>{ticket.classType}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(ticket.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(ticket.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No tickets added yet.</p>
      )}
    </div>
  );
};

export default RailwayTicketManagement;
