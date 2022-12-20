const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Planet = require("../models/Planet.Model");

//  POST /api/planets  -  Creates a new planet
router.post("/planets", (req, res, next) => {
  const { name, type, weather, description,  day, year , price, img } = req.body;

  Planet.create({ name, type, weather, description,  day, year , price, img })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/planets -  Retrieves all of the planets
router.get("/planets", (req, res, next) => {
  Planet.find()
   
    .then((allplanets) => res.json(allplanets))
    .catch((err) => res.json(err));
});

//  GET /api/planets/:planetId -  Retrieves a specific planet by id
router.get("/planets/:planetId", (req, res, next) => {
  const { planetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(planetId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each planet document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Planet.findById(planetId)
   
    .then((planet) => res.status(200).json(planet))
    .catch((error) => res.json(error));
});

// PUT  /api/planets/:planetId  -  Updates a specific planet by id
router.put("/planets/:planetId", (req, res, next) => {
  const { planetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(planetId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Planet.findByIdAndUpdate(planetId, req.body, { new: true })
    .then((updatedplanet) => res.json(updatedplanet))
    .catch((error) => res.json(error));
});

// DELETE  /api/planets/:planetId  -  Deletes a specific planet by id
router.delete("/planets/:planetId", (req, res, next) => {
  const { planetId } = req.params;

 
  Planet.findByIdAndRemove(planetId)
    .then(() =>
      res.json({
        message: `planet with ${planetId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;