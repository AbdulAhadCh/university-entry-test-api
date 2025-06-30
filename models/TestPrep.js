const mongoose = require('mongoose');
const TestPrepSchema = new mongoose.Schema({
  subId: String,
  testType: String,
  testName: String,
  duration: String,
  totalMarks: Number,
  testDate: String,
  test_id: String
});
module.exports = mongoose.model('TestPrep', TestPrepSchema, 'TestPrep_collection');
