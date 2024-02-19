const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true
  },
  username: String,
  fullName: String,
  phoneNumber: Number,
  isAdmin: Boolean
})

module.exports = mongoose.model('User', userSchema) 