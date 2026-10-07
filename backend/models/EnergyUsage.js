const mongoose = require("mongoose");

const energyUsageSchema = new mongoose.Schema(
    {
        fanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fan",
            required: true
        },

        energyConsumed: {
            type: Number,
            required: true
        },

        duration: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("EnergyUsage", energyUsageSchema);