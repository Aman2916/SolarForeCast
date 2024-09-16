// server/routes/api.js
const express = require("express");
//const SolarData = require('../models/SolarData');
const solarController = require("../controllers/solarController");
const router = express.Router();

// Route to get historical predictions
//router.get("/history", solarController.getHistoricalData);

module.exports = router;
