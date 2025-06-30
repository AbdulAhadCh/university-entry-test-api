const mongoose = require('mongoose');
const PersonalInfoSchema = new mongoose.Schema({
  personalInfoId: String,
  userId: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  userEmail: String,
  userDOB: String,
  userGenderId: Number,
  cityId: Number,
  provinceId: Number,
  countryId: Number,
  religionId: Number,
  userAddress: String,
  disability: Boolean,
  accountCreatedAt: String,
  profilePhoto: String
});
module.exports = mongoose.model('PersonalInfo', PersonalInfoSchema, 'personal_information');