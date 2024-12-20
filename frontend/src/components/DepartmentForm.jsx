import React, { useState } from 'react';
import axios from 'axios';
import './DepartmentForm.css';

function DepartmentForm() {
  const [departmentDetails, setDepartmentDetails] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentDetails({ ...departmentDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post('http://localhost:5000/api/department', departmentDetails);
      setMessage('Department added successfully!');
      setDepartmentDetails({ name: '', description: '' });
    } catch (err) {
      console.error('Error details:', err);
      setMessage('An error occurred while adding the department.');
    }
  };

  return (
    <div id="department-container">
      <h1>Add Department</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Department Name</label>
          <input
            onChange={handleChange}
            value={departmentDetails.name}
            type="text"
            name="name"
            placeholder="Enter Department Name"
            required
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={handleChange}
            value={departmentDetails.description}
            name="description"
            placeholder="Enter Department Description"
            required
          
          ></textarea>
        </div>
        <button type="submit">Add Department</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default DepartmentForm;
