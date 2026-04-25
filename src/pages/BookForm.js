import React, { useState } from "react";
import Swal from "sweetalert2";

const BookForm = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    publishDate: "",
    description: "",
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
    setBooks(books.filter((book) => book.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Book deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const book = books.find((b) => b.id === id);
    setFormData(book);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const book = books.find((b) => b.id === id);
    Swal.fire({
      title: "Book Details",
      html: `
        <strong>Title:</strong> ${book.title}<br>
        <strong>Author:</strong> ${book.author}<br>
        <strong>Genre:</strong> ${book.genre}<br>
        <strong>Price:</strong> $${book.price}<br>
        <strong>Publish Date:</strong> ${book.publishDate}<br>
        <strong>Description:</strong> ${book.description}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.author) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Title and Author are required.",
      });
      return;
    }
    if (!formData.price || formData.price <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Price must be valid.",
      });
      return;
    }

    if (!isEditing) {
      setBooks([...books, { ...formData, id: Date.now() }]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Book added successfully!",
      });
    } else {
      setBooks(
        books.map((book) =>
          book.id === editingId ? { ...formData, id: editingId } : book
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Book updated successfully!",
      });
    }

    setFormData({
      title: "",
      author: "",
      genre: "",
      price: "",
      publishDate: "",
      description: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Book Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre:</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
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
          <label className="form-label">Publish Date:</label>
          <input
            type="date"
            className="form-control"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-contro1l"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Book" : "Add Book"}
        </button>
      </form>

      <h2 className="mt-5">Book List</h2>
      {books.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>${book.price}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(book.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No books added yet.</p>
      )}
    </div>
  );
};

export default BookForm;

