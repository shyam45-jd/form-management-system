import React, { useState } from "react";
import Swal from "sweetalert2";

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
    rooms: "",
    amenities: "",
    contact: "",
    checkInTime: "",
    checkOutTime: "",
  });

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
    setHotels(hotels.filter((hotel) => hotel.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Hotel deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const hotel = hotels.find((h) => h.id === id);
    setFormData(hotel);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const hotel = hotels.find((h) => h.id === id);
    Swal.fire({
      title: "Hotel Details",
      html: `
        <strong>Name:</strong> ${hotel.name}<br>
        <strong>Location:</strong> ${hotel.location}<br>
        <strong>Rating:</strong> ${hotel.rating}<br>
        <strong>Rooms:</strong> ${hotel.rooms}<br>
        <strong>Amenities:</strong> ${hotel.amenities}<br>
        <strong>Contact:</strong> ${hotel.contact}<br>
        <strong>Check-In Time:</strong> ${hotel.checkInTime}<br>
        <strong>Check-Out Time:</strong> ${hotel.checkOutTime}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Hotel name is required." });
      return;
    }
    if (!formData.location) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Location is required." });
      return;
    }
    if (!formData.rating) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Rating is required." });
      return;
    }
    if (!formData.rooms) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Number of rooms is required." });
      return;
    }

    if (!isEditing) {
      setHotels([...hotels, { ...formData, id: Date.now() }]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hotel added successfully!",
      });
    } else {
      setHotels(
        hotels.map((hotel) =>
          hotel.id === editingId ? { ...formData, id: editingId } : hotel
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Hotel updated successfully!",
      });
    }

    setFormData({
      name: "",
      location: "",
      rating: "",
      rooms: "",
      amenities: "",
      contact: "",
      checkInTime: "",
      checkOutTime: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Hotel Management System</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Hotel Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating:</label>
          <input
            type="number"
            className="form-control"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Rooms:</label>
          <input
            type="number"
            className="form-control"
            name="rooms"
            value={formData.rooms}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amenities:</label>
          <textarea
            className="form-control"
            name="amenities"
            rows="3"
            value={formData.amenities}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Contact:</label>
          <input
            type="text"
            className="form-control"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Check-In Time:</label>
          <input
            type="time"
            className="form-control"
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Check-Out Time:</label>
          <input
            type="time"
            className="form-control"
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Hotel" : "Add Hotel"}
        </button>
      </form>

      <h2 className="mt-5">Hotel List</h2>
      {hotels.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.id}</td>
                <td>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td>{hotel.rating}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(hotel.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(hotel.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(hotel.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No hotels added yet.</p>
      )}
    </div>
  );
};

export default HotelManagement;   
