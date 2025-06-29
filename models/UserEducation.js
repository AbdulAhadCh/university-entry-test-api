const mongoose = require('mongoose');

const userEducationSchema = new mongoose.Schema({
  userId: String,
  degree: String,
  major: String,
  institute: String,
  year: String
});

module.exports = mongoose.model('UserEducation', userEducationSchema, 'usereducation');
