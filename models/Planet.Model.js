
const { Schema, model } = require('mongoose');

const PlanetSchema = new Schema(
  {
    name: String,
    type: String,
    weather: String,
    distanceSun: String,
    day: String,
    year: String,
    price: String,
    img: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Planet', PlanetSchema);
