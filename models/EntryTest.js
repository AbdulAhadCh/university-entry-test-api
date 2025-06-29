const mongoose = require('mongoose');

const entryTestSchema = new mongoose.Schema({
  testId: String,
  testName: String,
  instituteId: String,
  date: String
});

module.exports = mongoose.model('EntryTest', entryTestSchema, 'entry_Tests');
