import React, { useState } from "react";
import Swal from "sweetalert2";

const VegetableManagement = () => {
  const [vegetables, setVegetables] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",  
    quantity: "",
    notes: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Vegetable inventory
  const [inventory, setInventory] = useState({
    Tomato: 50,
    Potato: 100,
    Carrot: 75,
    Onion: 80,
  });
 
  const handleView = (id) => {
    const vegetable = vegetables.find((veg) => veg.id === id);
    Swal.fire({
      title: `Details for ${vegetable.name}`,
      html: `
        <strong>Category:</strong> ${vegetable.category}<br/>
        <strong>Price:</strong> $${vegetable.price}/kg<br/>
        <strong>Quantity:</strong> ${vegetable.quantity} kg<br/>
        <strong>Notes:</strong> ${vegetable.notes}
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
    const vegetableToDelete = vegetables.find((veg) => veg.id === id);
    setInventory((prevInventory) => ({
      ...prevInventory,
      [vegetableToDelete.name]: prevInventory[vegetableToDelete.name] + parseInt(vegetableToDelete.quantity),
    }));
    setVegetables(vegetables.filter((veg) => veg.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Vegetable entry deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const vegetable = vegetables.find((veg) => veg.id === id);
    setFormData(vegetable);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) {
      Swal.fire({ icon: "error", title: "Oops...", text: "All fields are required." });
      return;
    }

    if (inventory[formData.name] < parseInt(formData.quantity)) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Stock",
        text: `Only ${inventory[formData.name]} kg available.`,
      });
      return;
    }  

    if (!isEditing) {
      setVegetables([...vegetables, { ...formData, id: Date.now() }]);
      setInventory((prevInventory) => ({
        ...prevInventory,
        [formData.name]: prevInventory[formData.name] - parseInt(formData.quantity),
      }));
      Swal.fire({ icon: "success", title: "Success", text: "Vegetable added successfully!" });
    } else {
      setVegetables(
        vegetables.map((veg) => (veg.id === editingId ? { ...formData, id: editingId } : veg))
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({ icon: "success", title: "Updated", text: "Vegetable updated successfully!" });
    }

    setFormData({ name: "", category: "", price: "", quantity: "", notes: "" });   
  };

  return (
    <div className="container mt-5">
      <h2>Vegetable Management System</h2>
      <h4>Stock Availability</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Vegetable</th>
            <th>Available Stock (kg)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(inventory).map((veg) => (
            <tr key={veg}>
              <td>{veg}</td>
              <td>{inventory[veg]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">   
          <label className="form-label">Vegetable Name:</label>
          <select className="form-select" name="name" value={formData.name} onChange={handleInputChange}>
            <option value="" disabled>Select Vegetable</option>
            {Object.keys(inventory).map((veg) => (
              <option key={veg} value={veg}>{veg}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price per kg ($):</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity (kg):</label>
          <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes:</label>
          <textarea className="form-control" name="notes" rows="3" value={formData.notes} onChange={handleInputChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">{isEditing ? "Update Entry" : "Add Vegetable"}</button>
      </form>
      <h2 className="mt-5">Vegetable List</h2>
      {vegetables.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vegetables.map((veg) => (
              <tr key={veg.id}>
                <td>{veg.id}</td>
                <td>{veg.name}</td>
                <td>{veg.category}</td>
                <td>${veg.price}/kg</td>
                <td>{veg.quantity} kg</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => handleView(veg.id)}>View</button>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(veg.id)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(veg.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No vegetables added yet.</p>
      )}
    </div>
  );
};

export default VegetableManagement;
