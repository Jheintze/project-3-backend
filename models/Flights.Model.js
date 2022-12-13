
const { Schema, model } = require('mongoose');

const FlightsSchema = new Schema(
  {
    destination: String,
    duration: String,
    price: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Flights', FlightsSchema);