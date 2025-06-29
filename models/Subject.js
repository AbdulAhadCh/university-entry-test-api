const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectId: String,
  subjectName: String
});

module.exports = mongoose.model('Subject', subjectSchema, 'subjects');
