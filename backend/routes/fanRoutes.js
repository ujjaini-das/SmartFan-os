const express = require("express");

const {
    getFanStatus,
    controlFan,
    autoControlFan
} = require("../controllers/fanController");

const router = express.Router();

router.get("/status", getFanStatus);

router.post("/control", controlFan);

router.post("/auto-control", autoControlFan);

module.exports = router;