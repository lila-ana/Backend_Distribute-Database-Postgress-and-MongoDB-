// MongoDB Model
const mongoose = require('mongoose');

const userMongoSchema = new mongoose.Schema({
  // Define MongoDB user schema fields
  fullName: String,
  phone: String,
  email: String,
  password: String,
  role: String,
  country: String,
  volenteerTypeId: String,
  // Add more fields as needed
});

const UserMongo = mongoose.model('User', userMongoSchema);

module.exports = UserMongo;
