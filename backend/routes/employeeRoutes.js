const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Department = require('../models/Department');

// Add an Employee
router.post('/', async (req, res) => {
  const { name, department, address } = req.body;

  try {
    const departmentData = await Department.findById(department);
    if (!departmentData) return res.status(400).json({ message: 'Department not found' });

    const employee = new Employee({ name, department: departmentData._id, address });
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Error adding employee', error });
  }
});

// Get Employees
router.get('/', async (req, res) => {
  const query = {};
  
  try {
    const employees = await Employee.find(query)
      .populate('department', 'name')
      .exec();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});



module.exports = router;
