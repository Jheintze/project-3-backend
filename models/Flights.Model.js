const { Schema, model } = require("mongoose");

const FlightsSchema = new Schema({
  departure: {
    type: Date,
    required: [true, "Departure date is required."],
  },
  returning: {
    type: Date,
    required: [true, "Arrival date is required."],
  },
  price: {
    type: Number,
  },
  adults: {
    type: Number,
  },
  children: {
    type: Number,
  },
  TravelClass: {
    type: String,
  },
});

module.exports = model("Flights", FlightsSchema);
