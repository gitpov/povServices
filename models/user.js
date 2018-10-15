const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for users
const userSchema = new Schema({
  firstname: String,
  name: String,
  email: String,
  password: String,
  address: {
    street: String,
    NPA: Number,
    City: String
  }
});
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);