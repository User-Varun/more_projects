const mongoose = require("mongoose");
const validator = require("validator");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A hotel must have a name"]
  },
  location: {
    type: String,
    required: true
  },
  rooms_available: {
    type: Number,
    required: true
  },
  price_per_night: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, "rating must be above 1"],
    max: [5, "ratings must be below or equal to 5"]
  },
  facilities: {
    type: Array,
    required: true
  },
  contact_number: {
    type: String,
    required: true,
    minlength: [10, "A number must be of 10 digits"],
    maxlength: [10, "A number must be of 10 digits"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  pets_allowed: {
    type: Boolean,
    required: true
  },
  rating_count: {
    type: Number,
    required: true
  },
  distance_from_city_center: {
    type: Number,
    required: true
  }
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
