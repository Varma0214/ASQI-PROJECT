import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
const [departments, setDepartments] = useState([]);
const [name, setName] = useState('');
const [department, setDepartment] = useState('');
const [address, setAddress] = useState('');
const [message, setMessage] = useState('');

useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/department');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  fetchDepartments();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const employeeData = { name, department, address };

  try {
    const response = await axios.post('http://localhost:5000/api/employees', employeeData);
    setMessage(response.data.message);
    setName('');
    setDepartment('');
    setAddress('');
  } catch (error) {
    console.error('Error adding employee:', error);
    setMessage('Error adding employee.');
  }
};

return (
  <div className="employee-container">
    <h1> Add Employee </h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter employee name"
          required
        />
      </div>
      <div className="form-group">
        <label>Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          <option value="">
    {departments.length === 0 ? 'No Departments Available' : 'Select Department'}
  </option>
  {departments.length > 0 &&
    departments.map((dept) => (
      <option key={dept._id} value={dept._id}>
        {dept.name}
      </option>
    ))}
</select>
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          required
        />
      </div>
      <button type="submit">Add Employee</button>
    </form>
    {message && <p  className="message">{message}</p>}
  </div>
);
};

export default EmployeeForm;
