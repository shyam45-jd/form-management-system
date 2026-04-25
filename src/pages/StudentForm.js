import React, { useState } from "react";
import Swal from "sweetalert2";

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    section: "",
    subjects: [],
    email: "",
    gender: "",
    notes: "",
    admissionDate: "",
  });

  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"];
  const sections = ["A", "B", "C", "D"];
  const subjects = ["Math", "Science", "English", "History"];
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({                           
        ...prevData,
        subjects: checked
          ? [...prevData.subjects, value]
          : prevData.subjects.filter((subject) => subject !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

    }
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Student deleted successfully!",
    });
  };

  const handleEdit = (id) => {
    const student = students.find((stu) => stu.id === id);
    setFormData(student);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleView = (id) => {
    const student = students.find((stu) => stu.id === id);
    Swal.fire({
      title: "Student Details",
      html: `
        <strong>Name:</strong> ${student.name}<br>
        <strong>Age:</strong> ${student.age}<br>
        <strong>Grade:</strong> ${student.grade}<br>
        <strong>Section:</strong> ${student.section}<br>
        <strong>Subjects:</strong> ${student.subjects.join(", ")}<br>
        <strong>Gender:</strong> ${student.gender}<br>
        <strong>Notes:</strong> ${student.notes}<br>
        <strong>Admission Date:</strong> ${student.admissionDate}<br>
      `,
      icon: "info",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Name is required." });
      return;
    }
    if (!formData.age || formData.age <= 0) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Age must be valid or greaterthen zero." });
      return;
    }
    if (!formData.grade) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Grade is required." });
      return;
    }
    
    if (!formData.email) {
      Swal.fire({ icon: "error", title: "Oops...", text: "mail is required." });
      return;
    }
    if (!formData.section) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Section is required.",
      });
      return;
    }
    if (!formData.subjects.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select at least one subject.",
      });
      return;
    }
    if (!formData.email || !formData.email.includes("@")) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!isEditing) {
      setStudents([...students, { ...formData, id: Date.now() }]);
      Swal.fire({

        icon: "success",
        title: "Success",
        text: "Student added successfully!",
      });
    } else {
      setStudents(
        students.map((student) =>
          student.id === editingId ? { ...formData, id: editingId } : student
        )
      );
      setIsEditing(false);
      setEditingId(null);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Student updated successfully!",
      });
    }

    setFormData({
      name: "",
      age: "",
      grade: "",
      section: "",
      subjects: [],
      email: "",
      gender: "",
      notes: "",
      admissionDate: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grade:</label>
          <select
            className="form-select"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Grade
            </option>
            {grades.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Section:</label>
          <select
            className="form-select"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Section
            </option>
            {sections.map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Subjects:</label>
          {subjects.map((subject, index) => (
            <div key={index} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="subjects"
                value={subject}
                checked={formData.subjects.includes(subject)}
                onChange={handleInputChange}
              />
              <label className="form-check-label">{subject}</label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
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
          <label className="form-label">Admission Date:</label>
          <input
            type="date"
            className="form-control"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleInputChange}
          />
        </div>+
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Student" : "Add Student"}
        </button>
      </form>
      <h2 className="mt-5">Student List</h2>
      {students.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Section</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.section}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleView(student.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(student.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No students added yet.</p>
      )}
    </div>
  );
};

export default StudentForm;