const mongoose = require('mongoose');
const DepartmentSchema = new mongoose.Schema({
  deptName: String
});
module.exports = mongoose.model('Department', DepartmentSchema, 'Departments');