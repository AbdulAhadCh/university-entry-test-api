const mongoose = require('mongoose');

const testPrepSchema = new mongoose.Schema({
  userId: String,
  testName: String,
  score: Number,
  preparationLevel: String
});

module.exports = mongoose.models.TestPrep || mongoose.model('TestPrep', testPrepSchema, 'TestPrep_collection');
