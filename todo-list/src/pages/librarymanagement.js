import React, { useState } from "react";
import Swal from "sweetalert2";

const LibraryManagement = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    publisher: "",
    publicationDate: "",
    availability: true,
    notes: "",
  });

  const genres = ["Fiction", "Non-Fiction", "Science", "History", "Biography"];
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
    const book = books.find((bk) => bk.id === id);
    setFormData(book);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const book = books.find((bk) => bk.id === id);
    Swal.fire({
      title: "Book Details",
      html: `
        <strong>Title:</strong> ${book.title}<br>
        <strong>Author:</strong> ${book.author}<br>
        <strong>Genre:</strong> ${book.genre}<br>
        <strong>ISBN:</strong> ${book.isbn}<br>
        <strong>Publisher:</strong> ${book.publisher}<br>
        <strong>Publication Date:</strong> ${book.publicationDate}<br>
        <strong>Availability:</strong> ${book.availability ? "Available" : "Not Available"}<br>
        <strong>Notes:</strong> ${book.notes}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Title is required." });
      return;
    }
    if (!formData.author) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Author is required." });
      return;
    }
    if (!formData.genre) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Genre is required." });
      return;
    }
    if (!formData.isbn) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ISBN is required.",
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
      isbn: "",
      publisher: "",
      publicationDate: "",
      availability: true,
      notes: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Library Management</h2>
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
          <select
            className="form-select"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Genre
            </option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN:</label>
          <input
            type="text"
            className="form-control"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Publisher:</label>
          <input
            type="text"
            className="form-control"
            name="publisher"
            value={formData.publisher}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Publication Date:</label>
          <input
            type="date"
            className="form-control"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="availability"
            checked={formData.availability}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Available</label>
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
              <th>Genre</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
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

export default LibraryManagement;
