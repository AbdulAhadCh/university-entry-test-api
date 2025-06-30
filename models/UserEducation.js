const mongoose = require('mongoose');

const UserEducationSchema = new mongoose.Schema({
  userEduId: String,
  personalInfoId: String,
  degreeTitle: String,
  majorGroup: String,
  startYear: String,
  endYear: String,
  completionStatus: Boolean,
  city: String,
  country: String
});
module.exports = mongoose.model('UserEducation', UserEducationSchema, 'usereducation');