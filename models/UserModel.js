const mongoose = require('mongoose');
const UserModelSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});
module.exports = mongoose.model('UserModel', UserModelSchema, 'usermodels');
