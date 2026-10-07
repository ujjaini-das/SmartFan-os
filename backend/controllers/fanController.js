const Fan = require("../models/Fan");
const {
    calculateFanSpeed
} = require("../services/fanControlService");

// Get current fan status
const getFanStatus = async (req, res) => {
    try {
        let fan = await Fan.findOne();

        if (!fan) {
            fan = await Fan.create({
                name: "SmartFan",
                status: "OFF",
                speed: 0,
                mode: "AUTO"
            });
        }

        res.status(200).json({
            success: true,
            data: fan
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Manually control fan
const controlFan = async (req, res) => {
    try {
        const { speed, mode } = req.body;

        if (speed === undefined) {
            return res.status(400).json({
                success: false,
                message: "Fan speed is required"
            });
        }

        if (speed < 0 || speed > 5) {
            return res.status(400).json({
                success: false,
                message: "Fan speed must be between 0 and 5"
            });
        }

        let fan = await Fan.findOne();

        if (!fan) {
            fan = new Fan();
        }

        fan.speed = speed;
        fan.status = speed === 0 ? "OFF" : "ON";
        fan.mode = mode || "MANUAL";

        await fan.save();

        res.status(200).json({
            success: true,
            message: "Fan updated successfully",
            data: fan
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Automatic fan control
const autoControlFan = async (req, res) => {
    try {
        const {
            temperature,
            humidity,
            occupancy
        } = req.body;

        if (
            temperature === undefined ||
            humidity === undefined ||
            occupancy === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Temperature, humidity and occupancy are required"
            });
        }

        const decision = calculateFanSpeed(
            temperature,
            humidity,
            occupancy
        );

        let fan = await Fan.findOne();

        if (!fan) {
            fan = new Fan();
        }

        fan.speed = decision.speed;
        fan.status = decision.status;
        fan.mode = "AUTO";

        await fan.save();

        res.status(200).json({
            success: true,
            message: "Automatic fan control applied",
            decision,
            fan
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getFanStatus,
    controlFan,
    autoControlFan
};