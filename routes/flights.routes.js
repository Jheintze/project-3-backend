const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Flights = require("../models/Flights.Model");

router.post("/flights", (req, res, next) => {
    const { departure, returning , adults, children, TravelClass, price, user, planet  } = req.body;
  
    Flights.create({ departure, returning , adults, children, TravelClass, price, user , planet })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });
  
  router.get("/users/:userId/flights", (req, res, next) => {
    const { userId } = req.params;
   
    // Each planet document has `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    Flights.find({user:userId})
       .populate("planet")
      .then((Flights) => res.status(200).json(Flights))
      .catch((error) => res.json(error));
  });

  router.delete("/delete/:fligthId", (req, res, next) => {
    const { fligthId } = req.params;
  
    Flights.findByIdAndRemove(fligthId)
      .then(() =>
        res.json({
          message: `flight is removed successfully.`,
        })
      )
      .catch((error) => res.json(error));
  });
  module.exports = router;