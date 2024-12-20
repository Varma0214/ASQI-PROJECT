const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// Add a Department
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const department = new Department({ name, description });
    await department.save();
    res.status(201).json({ message: 'Department added successfully!', department });
  } catch (error) {
    console.error("Error while saving department:", error);
    res.status(500).json({ message: 'Error adding department', error });
  }
});

// Get All Departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find(); 
    res.json(departments);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

module.exports = router;
