const mongoose = require("mongoose");
const { Schema, model } = require('mongoose');

const PlanetSchema = new Schema(
  {
    name: String,
    type: String,
    weather: String,
    description: String,
    day: String,
    year: String,
    price: Number,
    img: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Planet', PlanetSchema);
