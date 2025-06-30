const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subId: String,
  subjectName: String,
  weightage: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('Subject', SubjectSchema, 'subjects');