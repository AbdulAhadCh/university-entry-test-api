const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentId: String,
  departmentName: String,
  instituteId: String
});

// ✅ Match exact collection name from Compass: 'Departments'
module.exports = mongoose.model('Department', departmentSchema, 'Departments');
