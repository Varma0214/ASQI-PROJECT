import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
        setFilteredEmployees(response.data); 
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    

    fetchEmployees();
    
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = employees.filter((employee) => {
      const name = employee.name || ''; 
      const department = employee.department || {}; 
      return (
        name.toLowerCase().includes(term) ||
        (department.name && department.name.toLowerCase().includes(term)) 
      );
    });

    setFilteredEmployees(filtered);
  };

  return (
    <div className="employee-table-container">
      <h1>Employee Table</h1>

      {/* Search Bar */}
      <div className="search-bar">
      
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Name or Department"
        />

      </div>
     


      {/* Employee Table */}
      {filteredEmployees.length === 0 ? (
        <p className="empty-message">No employees </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name || 'N/A'}</td>
                <td>{employee.department?.name || 'N/A'}</td>
                <td>{employee.address || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeTable;