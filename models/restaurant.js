// models/restaurant.js
const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
  address: {
    building: String,
    street: String,
    zipcode: String,
  },
  city: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  restaurant_id: {
    type: String,
    required: true,
  },
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
