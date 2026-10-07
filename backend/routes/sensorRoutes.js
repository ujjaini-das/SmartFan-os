const express = require("express");

const {
    addSensorData,
    getLatestSensorData,
    getSensorHistory
} = require("../controllers/sensorController");

const router = express.Router();

// Add sensor data
router.post("/", addSensorData);

// Get latest sensor data
router.get("/latest", getLatestSensorData);

// Get sensor history
router.get("/history", getSensorHistory);

module.exports = router;