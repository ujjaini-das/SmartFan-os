const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
    {
        temperature: {
            type: Number,
            required: true
        },

        humidity: {
            type: Number,
            required: true
        },

        occupancy: {
            type: Boolean,
            required: true
        },

        fanSpeed: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("SensorData", sensorDataSchema);