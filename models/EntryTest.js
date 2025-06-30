const mongoose = require('mongoose');
const EntryTestSchema = new mongoose.Schema({
  test_id: String,
  testTitle: String,
  sections: [mongoose.Schema.Types.Mixed] // flexible for array of objects
});
module.exports = mongoose.model('EntryTest', EntryTestSchema, 'entry_Tests');
