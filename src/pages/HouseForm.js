import React, { useState } from "react";
import Swal from "sweetalert2";

const HouseForm = () => {
  const [houses, setHouses] = useState([]);
  const [formData, setFormData] = useState({
    houseName: "",
    ownerName: "",
    address: "",
    price: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    amenities: [],
    constructionDate: "",
  });

  const houseTypes = ["Apartment", "Villa", "Townhouse", "Cottage"];
  const amenitiesList = ["Pool", "Garage", "Garden", "Gym"];
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        amenities: checked
          ? [...prevData.amenities, value]
          : prevData.amenities.filter((amenity) => amenity !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDelete = (id) => {
    setHouses(houses.filter((house) => house.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "House deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const house = houses.find((h) => h.id === id);
    setFormData(house);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const house = houses.find((h) => h.id === id);
    Swal.fire({
      title: "House Details",
      html: `
        <strong>House Name:</strong> ${house.houseName}<br>
        <strong>Owner Name:</strong> ${house.ownerName}<br>
        <strong>Address:</strong> ${house.address}<br>
        <strong>Price:</strong> $${house.price}<br>
        <strong>Type:</strong> ${house.type}<br>
        <strong>Bedrooms:</strong> ${house.bedrooms}<br>
        <strong>Bathrooms:</strong> ${house.bathrooms}<br>
        <strong>Amenities:</strong> ${house.amenities.join(", ")}<br>
        <strong>Construction Date:</strong> ${house.constructionDate}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.houseName || !formData.ownerName) {
      Swal.fire({ icon: "error", title: "Error", text: "Name fields are required." });
      return;
    }
    if (!formData.price || formData.price <= 0) {
      Swal.fire({ icon: "error", title: "Error", text: "Price must be valid." });
      return;
    }
    if (!formData.type) {
      Swal.fire({ icon: "error", title: "Error", text: "Type is required." });
      return;
    }

    if (!isEditing) {
      setHouses([...houses, { ...formData, id: Date.now() }]);
      Swal.fire({ icon: "success", title: "Success", text: "House added successfully!" });
    } else {
      setHouses(
        houses.map((house) =>
          house.id === editingId ? { ...formData, id: editingId } : house
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({ icon: "success", title: "Updated", text: "House updated successfully!" });
    }

    setFormData({
      houseName: "",
      ownerName: "",
      address: "",
      price: "",
      type: "",
      bedrooms: "",
      bathrooms: "",
      amenities: [],
      constructionDate: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>House Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">House Name:</label>
          <input
            type="text"
            className="form-control"
            name="houseName"
            value={formData.houseName}
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
          <label className="form-label">Address:</label>
          <textarea
            className="form-control"
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Price ($):</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
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
            {houseTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Bedrooms:</label>
          <input
            type="number"
            className="form-control"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bathrooms:</label>
          <input
            type="number"
            className="form-control"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amenities:</label>
          {amenitiesList.map((amenity, index) => (
            <div key={index} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="amenities"
                value={amenity}
                checked={formData.amenities.includes(amenity)}
                onChange={handleInputChange}
              />
              <label className="form-check-label">{amenity}</label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label className="form-label">Construction Date:</label>
          <input
            type="date"
            className="form-control"
            name="constructionDate"
            value={formData.constructionDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update House" : "Add House"}
        </button>
      </form>

      <h2 className="mt-5">House List</h2>
      {houses.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead> 
            <tr>
              <th>ID</th>
              <th>House Name</th>
              <th>Owner Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => (
              <tr key={house.id}>
                <td>{house.id}</td>
                <td>{house.houseName}</td>
                <td>{house.ownerName}</td>
                <td>${house.price}</td>
                <td>{house.type}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(house.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(house.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(house.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No houses added yet.</p>
      )}
    </div>
  );
};

export default HouseForm;
