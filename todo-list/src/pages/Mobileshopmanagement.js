import React, { useState } from "react";
import Swal from "sweetalert2";

const MobileShopManagement = () => {
  const [mobiles, setMobiles] = useState([]);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    price: "",
    stock: "",
    description: "",
    releaseDate: "",
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
    setMobiles(mobiles.filter((mobile) => mobile.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Mobile deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const mobile = mobiles.find((mob) => mob.id === id);
    setFormData(mobile);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const mobile = mobiles.find((mob) => mob.id === id);
    Swal.fire({
      title: "Mobile Details",
      html: `
        <strong>Brand:</strong> ${mobile.brand}<br>
        <strong>Model:</strong> ${mobile.model}<br>
        <strong>Price:</strong> $${mobile.price}<br>
        <strong>Stock:</strong> ${mobile.stock}<br>
        <strong>Description:</strong> ${mobile.description}<br>
        <strong>Release Date:</strong> ${mobile.releaseDate}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["brand", "model", "price", "stock"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${field[0].toUpperCase() + field.slice(1)} is required.`,
        });
        return;
      }
    }

    if (!isEditing) {
      setMobiles([...mobiles, { ...formData, id: Date.now() }]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Mobile added successfully!",
      });
    } else {
      setMobiles(
        mobiles.map((mobile) =>
          mobile.id === editingId ? { ...formData, id: editingId } : mobile
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Mobile updated successfully!",
      });
    }

    setFormData({
      brand: "",
      model: "",
      price: "",
      stock: "",
      description: "",
      releaseDate: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Mobile Shop Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Brand:</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
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
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Release Date:</label>
          <input
            type="date"
            className="form-control"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Mobile" : "Add Mobile"}
        </button>
      </form>

      <h2 className="mt-5">Mobile List</h2>
      {mobiles.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mobiles.map((mobile) => (
              <tr key={mobile.id}>
                <td>{mobile.id}</td>
                <td>{mobile.brand}</td>
                <td>{mobile.model}</td>
                <td>${mobile.price}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(mobile.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(mobile.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(mobile.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No mobiles added yet.</p>
      )}
    </div>
  );
};

export default MobileShopManagement;
