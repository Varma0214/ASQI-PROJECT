import React from 'react';
import DepartmentForm from './components/DepartmentForm';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import './App.css';


function App() {
  return (
    <div className="app">
      <h1 className="main-heading">Employee Management</h1>
      <div className="form-container">
        <DepartmentForm />
        <EmployeeForm />
      </div>
      <div>
        <EmployeeTable />
      </div>
    </div>
  );
}

export default App;
