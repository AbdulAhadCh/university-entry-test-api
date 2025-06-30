const mongoose = require('mongoose');
const InstituteInformationSchema = new mongoose.Schema({
  instituteName: String,
  cityId: String,
  provinceId: String,
  instituteEmail: String,
  instituteWebsiteUrl: String
});
module.exports = mongoose.model('InstituteInformation', InstituteInformationSchema, 'Institute-Information');
