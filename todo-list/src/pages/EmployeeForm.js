
import React, { useState } from "react";
import Swal from 'sweetalert2';

const EmployeeForm = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    role: "",
    salary: "",
    email: "",
    skills: [],
      gender: "",
      resume: null,
      notes: "",
      joiningDate: "",
  });

  // Dropdown options
  const departments = ["HR", "Engineering", "Sales", "Marketing", "Finance"];
  const positions = ["Manager", "Senior Developer", "Junior Developer", "Designer", "Analyst"];
  const roles = ["Admin", "Employee", "Contractor", "Intern"];
  const skills = ["JavaScript", "Python", "React", "CSS"]; // Checkbox options
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        skills: checked
          ? [...prevData.skills, value]
          : prevData.skills.filter((skill) => skill !== value),
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        resume: files[0], // Store the selected file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

//edit delete,view button logic 
const handleDelete = (id) => {
  setEmployees(employees.filter((employee) => employee.id !== id));
  Swal.fire({
    icon: "success",
    title: "Deleted",
    text: "Employee deleted successfully!",
  });
};

const handleEdit = (id) => {
  const employee = employees.find((emp) => emp.id === id);
  setFormData(employee);
  setIsEditing(true);
  setEditingId(id);
};

const handleView = (id) => {
  const employee = employees.find((emp) => emp.id === id);
  Swal.fire({
    title: "Employee Details",
    html: `
      <strong>Name:</strong> ${employee.name}<br>
      <strong>Position:</strong> ${employee.position}<br>
      <strong>Department:</strong> ${employee.department}<br>
      <strong>Role:</strong> ${employee.role}<br>
      <strong>Salary:</strong> ${employee.salary}<br>
      <strong>Email:</strong> ${employee.email}<br>
      <strong>Skills:</strong> ${employee.skills.join(", ")}<br>
      <strong>Gender:</strong> ${employee.gender}<br>
      <strong>Notes:</strong> ${employee.notes}<br>
      <strong>Joining Date:</strong> ${employee.joiningDate}<br>
    `,
    icon: "info",
  });
};


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //validation chexk
    if (!formData.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out the Name field.'
      });
      return;
    }
  
    if (!formData.position) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out the Position field.'
      });
      return;
    }
  
    if (!formData.department) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out the Department field.'
      });
      return;
    }
  
    if (!formData.role) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out the Role field.'
      });
      return;
    }
  
    if (!formData.salary) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out the Salary field.'
      });
      return;
    }
    if (!formData.email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out the email field.'
      });
      return;
    }
    // Ensure the email doesn't contain '@' or '.com'
if (!formData.email.includes('@') || !formData.email.includes('.com')) {
  Swal.fire({
    icon: 'error',
    title: 'Invalid Email',
    text: 'The email field should not contain "@" or ".com".',
  });
  return;
}
if (!formData.skills) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please fill out the Skill field.'
  });
  return;
}
if (!formData.notes) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please fill out the notes field.'
  });
  return;
}
//add validation
  if (!isEditing) {
    setEmployees([...employees, { ...formData, id: Date.now() }]);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Employee added successfully!",
    });
  } else {
    setEmployees(
      employees.map((employee) =>
        employee.id === editingId ? { ...formData, id: editingId } : employee
      )
    );
    setIsEditing(false);
    setEditingId(null);
    Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Employee updated successfully!",
    });
  }


    // Reset the form
    setFormData({ name: "", position: "", department: "", role: "", salary: "" ,skills: [],
  gender: "",
  resume: null,
  notes: "",
  joiningDate: "",});

  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Employee</h2>
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
          <label className="form-label">Position:</label>
          <select
            className="form-select"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Position</option>
            {positions.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select
            className="form-select"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Role:</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Salary:</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
           type="email" // Use "email" type for email validation
            className="form-control"
            name="email"
            value={formData.email} // Bind to formData.email
            onChange={handleInputChange} // Handle input changes
           placeholder="Enter your email" // Optional placeholder
        />
      </div>

        {/* Skills (Checkboxes) */}
        <div className="mb-3">
          <label className="form-label">Skills:</label>
          <div>
            {skills.map((skill, index) => (
              <div key={index} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">{skill}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Gender (Radio Buttons) */}
        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </div>

        {/* Resume (File Upload) */}
        <div className="mb-3">
          <label className="form-label">Upload Resume:</label>
          <input
            type="file"
            className="form-control"
            name="resume"
            onChange={handleInputChange}
          />
        </div>

        {/* Notes (Text Area) */}
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

        {/* Joining Date (Date Picker) */}
        <div className="mb-3">
          <label className="form-label">Joining Date:</label>
          <input
            type="date"
            className="form-control"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
{/* after add data populates result here */}
      <h2 className="mt-5">Employee List</h2>
      {employees.length > 0 ? (
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.role}</td>
                <td>${employee.salary}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleView(employee.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No employees added yet.</p>
      )}
    </div>
  );
};

export default EmployeeForm;
