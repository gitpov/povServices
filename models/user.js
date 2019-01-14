const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for users
const userSchema = new Schema({
  firstname: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  address: {
    street: {type: String, required: true},
    NPA: {type: Number, required: true},
    City: {type: String, required: true},
  },
   image: {type: String}
});
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);