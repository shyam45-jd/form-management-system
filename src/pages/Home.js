// import React from "react";

// const Home = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Welcome to the React Sample Project</h2>
//       <p>This is a simple React project with a single page.</p>
//     </div>
//   );
// };

// export default Home;

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// // Sample data for pagination
// const sampleData = Array.from({ length: 50 }, (_, i) => ({
//   id: i + 1,
//   name: `Item ${i + 1}`,
// }));

// const Home = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       age: "",
//       gender: "",
//       hobbies: [],
//       country: "",
//       about: "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Name is required"),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: Yup.string().min(6, "Min 6 characters").required("Password required"),
//       age: Yup.number().min(18, "Min age is 18").required("Age is required"),
//       gender: Yup.string().required("Gender is required"),
//       hobbies: Yup.array().min(1, "Select at least one hobby"),
//       country: Yup.string().required("Select a country"),
//       about: Yup.string().min(10, "Min 10 characters"),
//     }),
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   // Pagination logic
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = sampleData.slice(startIndex, startIndex + itemsPerPage);
//   const totalPages = Math.ceil(sampleData.length / itemsPerPage);

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">React Form with Validation</h2>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">

//         {/* Text Field */}
//         <div>
//           <label>Name:</label>
//           <input name="name" onChange={formik.handleChange} value={formik.values.name} />
//           {formik.touched.name && formik.errors.name && <div className="text-red-600">{formik.errors.name}</div>}
//         </div>

//         {/* Email */}
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
//           {formik.touched.email && formik.errors.email && <div className="text-red-600">{formik.errors.email}</div>}
//         </div>

//         {/* Password */}
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
//           {formik.touched.password && formik.errors.password && <div className="text-red-600">{formik.errors.password}</div>}
//         </div>

//         {/* Age */}
//         <div>
//           <label>Age:</label>
//           <input type="number" name="age" onChange={formik.handleChange} value={formik.values.age} />
//           {formik.touched.age && formik.errors.age && <div className="text-red-600">{formik.errors.age}</div>}
//         </div>

//         {/* Radio */}
//         <div>
//           <label>Gender:</label>
//           <label><input type="radio" name="gender" value="male" onChange={formik.handleChange} /> Male</label>
//           <label><input type="radio" name="gender" value="female" onChange={formik.handleChange} /> Female</label>
//           {formik.touched.gender && formik.errors.gender && <div className="text-red-600">{formik.errors.gender}</div>}
//         </div>

//         {/* Checkbox */}
//         <div>
//           <label>Hobbies:</label>
//           <label><input type="checkbox" name="hobbies" value="reading" onChange={formik.handleChange} /> Reading</label>
//           <label><input type="checkbox" name="hobbies" value="sports" onChange={formik.handleChange} /> Sports</label>
//           <label><input type="checkbox" name="hobbies" value="music" onChange={formik.handleChange} /> Music</label>
//           {formik.touched.hobbies && formik.errors.hobbies && <div className="text-red-600">{formik.errors.hobbies}</div>}
//         </div>

//         {/* Dropdown */}
//         <div>
//           <label>Country:</label>
//           <select name="country" onChange={formik.handleChange} value={formik.values.country}>
//             <option value="">Select</option>
//             <option value="india">India</option>
//             <option value="usa">USA</option>
//             <option value="uk">UK</option>
//           </select>
//           {formik.touched.country && formik.errors.country && <div className="text-red-600">{formik.errors.country}</div>}
//         </div>

//         {/* Textarea */}
//         <div>
//           <label>About:</label>
//           <textarea name="about" onChange={formik.handleChange} value={formik.values.about} />
//           {formik.touched.about && formik.errors.about && <div className="text-red-600">{formik.errors.about}</div>}
//         </div>

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit</button>
//       </form>

//       <hr className="my-8" />

//       <h2 className="text-xl font-semibold mb-4">Paginated List</h2>
//       <ul className="space-y-1">
//         {currentItems.map((item) => (
//           <li key={item.id} className="border p-2 rounded">{item.name}</li>
//         ))}
//       </ul>

//       <div className="flex space-x-2 mt-4">
//         <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>
//         {[...Array(totalPages)].map((_, i) => (
//           <button key={i} className={currentPage === i + 1 ? "font-bold" : ""} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
//         ))}
//         <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default Home;
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
            className="form-control"
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
