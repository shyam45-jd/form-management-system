
// export default RailwayTicketManagement;
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

  // Train inventory (initial available tickets for each train)
  const [trainInventory, setTrainInventory] = useState({
    "101": 10,
    "102": 50,
    "103": 75,
    "104":20,
  });

  const handleView = (id) => {
    const ticket = tickets.find((tick) => tick.id === id);
    Swal.fire({
      title: `Ticket Details for ${ticket.passengerName}`,
      html: `
        <strong>Train Number:</strong> ${ticket.trainNumber}<br/>  
        <strong>Class Type:</strong> ${ticket.classType}<br/>
        <strong>Destination:</strong> ${ticket.destination}<br/>
        <strong>Departure Date:</strong> ${ticket.departureDate}<br/>
        <strong>Seat Number:</strong> ${ticket.seatNumber}<br/>
        <strong>Notes:</strong> ${ticket.notes} 
      `,
      icon: "info",
    });
  }; 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    const ticketToDelete = tickets.find((ticket) => ticket.id === id);

    // Restore the ticket count for the train
    setTrainInventory((prevInventory) => ({
      ...prevInventory,
      [ticketToDelete.trainNumber]:
        prevInventory[ticketToDelete.trainNumber] + 1,
    }));

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

  const handleSubmit = (e) => {
    debugger
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

    const availableTickets = trainInventory[formData.trainNumber];
    if (availableTickets === 0) {
      Swal.fire({
        icon: "error",
        title: "No Tickets Available",
        text: `No tickets are available for Train ${formData.trainNumber}.`,
      });
      return;
    }

    if (!isEditing) {
      // Add a new ticket
      setTickets([...tickets, { ...formData, id: Date.now() }]);

      // Decrease ticket count
      setTrainInventory((prevInventory) => ({
        ...prevInventory,
        [formData.trainNumber]: prevInventory[formData.trainNumber] - 1,
      }));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Ticket added successfully!",
      });
    } else {
      // Editing a ticket does not change ticket counts
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


      {/* Display Train Inventory */}
      <h4>Train Ticket Availability</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Available Tickets</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(trainInventory).map((trainNumber) => (
            <tr key={trainNumber}>
              <td>{trainNumber}</td>
              <td>{trainInventory[trainNumber]}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
          <select
            className="form-select"
            name="trainNumber"
            value={formData.trainNumber}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Train
            </option>
            {Object.keys(trainInventory).map((trainNumber) => (
              <option key={trainNumber} value={trainNumber}>
                Train {trainNumber} ({trainInventory[trainNumber]} tickets available)
              </option>
            ))}
          </select>
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

