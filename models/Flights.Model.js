const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

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
  planet: {
    type: Schema.Types.ObjectId,
    ref: "Planet"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

});

module.exports = model("Flights", FlightsSchema);
