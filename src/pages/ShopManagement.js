import React, { useState } from "react";
import Swal from "sweetalert2";

const ShopManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    category: "",
    price: "",
    stockQuantity: "",
    description: "",
  });

  const categories = ["wheet", "pottato", "onion"];
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Initial product inventory (available stock for each product)
  const [productInventory, setProductInventory] = useState({
    "145kg": "10kg",
    "150kg": "50kg",
    "103 kg": "75kg",
    "111kg":"20kg",
  });

  const handleView = (id) => {
    const product = products.find((prod) => prod.id === id);
    Swal.fire({
      title: `Product Details: ${product.productName}`,
      html: `
        <strong>Product Code:</strong> ${product.productCode}<br/>
        <strong>Category:</strong> ${product.category}<br/>
        <strong>Price:</strong> $${product.price}<br/>
        <strong>Stock Quantity:</strong> ${product.stockQuantity}<br/>
        <strong>Description:</strong> ${product.description}
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
    const productToDelete = products.find((product) => product.id === id);

    // Restore the stock quantity for the product
    setProductInventory((prevInventory) => ({
      ...prevInventory,
      [productToDelete.productCode]:
        prevInventory[productToDelete.productCode] + parseInt(productToDelete.stockQuantity),
    }));

    setProducts(products.filter((product) => product.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Product deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const product = products.find((prod) => prod.id === id);
    setFormData(product);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.productName || !formData.productCode || !formData.price || !formData.stockQuantity) {
      Swal.fire({ icon: "error", title: "Oops...", text: "All fields are required!" });
      return;
    }

    const availableStock = productInventory[formData.productCode];
    if (parseInt(formData.stockQuantity) > availableStock) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Stock",
        text: `Only ${availableStock} items are available for Product ${formData.productCode}.`,
      });
      return;
    }

    if (!isEditing) {
      // Add a new product
      setProducts([...products, { ...formData, id: Date.now() }]);

      // Decrease stock quantity
      setProductInventory((prevInventory) => ({
        ...prevInventory,
        [formData.productCode]: prevInventory[formData.productCode] - parseInt(formData.stockQuantity),
      }));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product added successfully!",
      });
    } else {
      // Editing a product does not change stock quantities
      setProducts(
        products.map((product) =>
          product.id === editingId ? { ...formData, id: editingId } : product
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Product updated successfully!",
      });
    }

    setFormData({
      productName: "",
      productCode: "",
      category: "",
      price: "",
      stockQuantity: "",
      description: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Shop Management System</h2>

      {/* Display Product Inventory */}
      <h4>Product Stock Availability</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Available Stock</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(productInventory).map((productCode) => (
            <tr key={productCode}>
              <td>{productCode}</td>
              <td>{productInventory[productCode]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Code:</label>
          <select
            className="form-select"
            name="productCode"
            value={formData.productCode}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Product Code
            </option>
            {Object.keys(productInventory).map((productCode) => (
              <option key={productCode} value={productCode}>
                {productCode} ({productInventory[productCode]} available)
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
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
          <label className="form-label">Stock Quantity:</label>
          <input
            type="number"
            className="form-control"
            name="stockQuantity"
            value={formData.stockQuantity}
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
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="mt-5">Product List</h2>
      {products.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.productCode}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(product.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No products added yet.</p>
      )}
    </div>
  );
};

export default ShopManagement;