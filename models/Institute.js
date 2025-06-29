const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  instituteName: String,
  cityId: String,
  provinceId: String,
  instituteEmail: String,
  instituteWebsiteUrl: String
});

// ✅ Correct collection name with hyphen, as in Atlas
module.exports = mongoose.model('Institute', instituteSchema, 'Institute-Information');
