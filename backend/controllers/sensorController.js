const SensorData = require("../models/SensorData");

// Add new sensor data
const addSensorData = async (req, res) => {
    try {
        const { temperature, humidity, occupancy } = req.body;

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

        const sensorData = await SensorData.create({
            temperature,
            humidity,
            occupancy
        });

        res.status(201).json({
            success: true,
            message: "Sensor data saved successfully",
            data: sensorData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get latest sensor data
const getLatestSensorData = async (req, res) => {
    try {
        const sensorData = await SensorData.findOne()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: sensorData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get sensor history
const getSensorHistory = async (req, res) => {
    try {
        const sensorData = await SensorData.find()
            .sort({ createdAt: -1 })
            .limit(50);

        res.status(200).json({
            success: true,
            count: sensorData.length,
            data: sensorData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addSensorData,
    getLatestSensorData,
    getSensorHistory
};