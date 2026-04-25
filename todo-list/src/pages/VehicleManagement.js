import React, { useState } from "react";
import Swal from "sweetalert2";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    registrationNumber: "",
    ownerName: "",
    type: "",
    model: "",
    manufacturer: "",
    fuelType: "",
    notes: "",
    purchaseDate: "",
  });

  const vehicleTypes = ["Car", "Truck", "Bike", "Bus"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
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
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Vehicle deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const vehicle = vehicles.find((veh) => veh.id === id);
    setFormData(vehicle);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const vehicle = vehicles.find((veh) => veh.id === id);
    Swal.fire({
      title: "Vehicle Details",
      html: `
        <strong>Registration Number:</strong> ${vehicle.registrationNumber}<br>
        <strong>Owner Name:</strong> ${vehicle.ownerName}<br>
        <strong>Type:</strong> ${vehicle.type}<br>
        <strong>Model:</strong> ${vehicle.model}<br>
        <strong>Manufacturer:</strong> ${vehicle.manufacturer}<br>
        <strong>Fuel Type:</strong> ${vehicle.fuelType}<br>
        <strong>Notes:</strong> ${vehicle.notes}<br>
        <strong>Purchase Date:</strong> ${vehicle.purchaseDate}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.registrationNumber) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Registration number is required." });
      return;
    }
    if (!formData.ownerName) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Owner name is required." });
      return;
    }
    if (!formData.type) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Vehicle type is required." });
      return;
    }
    if (!formData.model) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Vehicle model is required." });
      return;
    }
    if (!formData.manufacturer) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Manufacturer is required." });
      return;
    }

    if (!isEditing) {
      setVehicles([...vehicles, { ...formData, id: Date.now() }]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Vehicle added successfully!",
      });
    } else {
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === editingId ? { ...formData, id: editingId } : vehicle
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Vehicle updated successfully!",
      });
    }

    setFormData({
      registrationNumber: "",
      ownerName: "",
      type: "",
      model: "",
      manufacturer: "",
      fuelType: "",
      notes: "",
      purchaseDate: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Vehicle Management System</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Registration Number:</label>
          <input
            type="text"
            className="form-control"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Owner Name:</label>
          <input
            type="text"
            className="form-control"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type:</label>
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Type
            </option>
            {vehicleTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Model:</label>
          <input
            type="text"
            className="form-control"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Manufacturer:</label>
          <input
            type="text"
            className="form-control"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fuel Type:</label>
          <select
            className="form-select"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Fuel Type
            </option>
            {fuelTypes.map((fuel, index) => (
              <option key={index} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
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
        <div className="mb-3">
          <label className="form-label">Purchase Date:</label>
          <input
            type="date"
            className="form-control"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </form>

      <h2 className="mt-5">Vehicle List</h2>
      {vehicles.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Registration Number</th>
              <th>Owner Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.registrationNumber}</td>
                <td>{vehicle.ownerName}</td>
                <td>{vehicle.type}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(vehicle.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(vehicle.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(vehicle.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No vehicles added yet.</p>
      )}
    </div>
  );
};

export default VehicleManagement;
