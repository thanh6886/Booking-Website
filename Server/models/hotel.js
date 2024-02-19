const mongoose = require('mongoose');

const Schema = mongoose.Schema

const hotelSchema = new Schema({
  name: String,
  type: String,
  city: String,
  address: String,
  distance: String,
  photos: [
    { type: String }
  ],
  desc: String,
  rating: Number,
  featured: Boolean,
  rooms: [
    { type: mongoose.Types.ObjectId, ref: 'Room' }
  ]
})

module.exports = mongoose.model('Hotel', hotelSchema)