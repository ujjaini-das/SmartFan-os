const mongoose = require("mongoose");

const fanSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "SmartFan"
        },

        status: {
            type: String,
            enum: ["ON", "OFF"],
            default: "OFF"
        },

        speed: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },

        mode: {
            type: String,
            enum: ["AUTO", "MANUAL"],
            default: "AUTO"
        },

        powerConsumption: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Fan", fanSchema);