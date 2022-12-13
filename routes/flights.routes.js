const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Flights = require("../models/Flights.Model");

router.post("/flights", (req, res, next) => {
    const { departure, returning , adults, children, TravelClass  } = req.body;
  
    Flights.create({ departure, returning , adults, children, TravelClass, price })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

  module.exports = router;