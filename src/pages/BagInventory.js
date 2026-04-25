import React, { useState } from "react";
import Swal from "sweetalert2";

const BagInventory = () => {
  const [bags, setBags] = useState([]);
  const [formData, setFormData] = useState({
    brand: "",
    type: "",
    color: "",
    price: "",
    material: "",
    stock: "",
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
    setBags(bags.filter((bag) => bag.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Bag deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const bag = bags.find((b) => b.id === id);
    setFormData(bag);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const bag = bags.find((b) => b.id === id);
    Swal.fire({
      title: "Bag Details",
      html: `
        <strong>Brand:</strong> ${bag.brand}<br>
        <strong>Type:</strong> ${bag.type}<br>
        <strong>Color:</strong> ${bag.color}<br>
        <strong>Price:</strong> $${bag.price}<br>
        <strong>Material:</strong> ${bag.material}<br>
        <strong>Stock:</strong> ${bag.stock}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.brand) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Brand is required." });
      return;
    }
    if (!formData.type) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Type is required." });
      return;
    }
    if (!formData.price) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Price is required." });
      return;
    }
    if (!formData.stock) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Stock is required." });
      return;
    }

    if (!isEditing) {
      setBags([...bags, { ...formData, id: Date.now() }]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Bag added successfully!",
      });
    } else {
      setBags(
        bags.map((bag) =>
          bag.id === editingId ? { ...formData, id: editingId } : bag
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Bag updated successfully!",
      });
    }

    setFormData({
      brand: "",
      type: "",
      color: "",
      price: "",
      material: "",
      stock: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Bag Inventory System</h2>
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
          <label className="form-label">Type:</label> 
          <input
            type="text"
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Color:</label>
          <input
            type="text"
            className="form-control"
            name="color"
            value={formData.color}
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
          <label className="form-label">Material:</label>
          <input
            type="text"
            className="form-control"
            name="material"
            value={formData.material}
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
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Bag" : "Add Bag"}
        </button>
      </form>

      <h2 className="mt-5">Bag List</h2>
      {bags.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Type</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bags.map((bag) => (
              <tr key={bag.id}>
                <td>{bag.id}</td>
                <td>{bag.brand}</td>
                <td>{bag.type}</td>
                <td>${bag.price}</td>
                <td>0
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(bag.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(bag.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(bag.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No bags added yet.</p>
      )}
    </div>
  );
};

export default BagInventory;
