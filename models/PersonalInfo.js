const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userId: String,
  name: String,
  cnic: String,
  phone: String,
  dob: String
});

module.exports = mongoose.model('PersonalInfo', personalInfoSchema, 'personal_information');
