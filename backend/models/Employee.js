const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  address: { type: String, required: true },
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;

