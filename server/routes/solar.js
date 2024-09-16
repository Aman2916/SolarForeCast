const express = require("express");
const router = express.Router();
const solarController = require("../controllers/solarController");

// POST route for prediction
router.post("/predict", solarController.getPrediction);

module.exports = router;
