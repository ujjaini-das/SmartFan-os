const SensorData = require("../models/SensorData");
const Fan = require("../models/Fan");
const EnergyUsage = require("../models/EnergyUsage");

const getDashboardData = async (req, res) => {
    try {
        // Get latest sensor reading
        const latestSensor = await SensorData.findOne()
            .sort({ createdAt: -1 });

        // Get current fan status
        const fan = await Fan.findOne();

        // Get recent sensor history
        const recentSensors = await SensorData.find()
            .sort({ createdAt: -1 })
            .limit(10);

        // Get total energy consumption
        const energyData = await EnergyUsage.aggregate([
            {
                $group: {
                    _id: null,
                    totalEnergy: {
                        $sum: "$energyConsumed"
                    }
                }
            }
        ]);

        const totalEnergy =
            energyData.length > 0
                ? energyData[0].totalEnergy
                : 0;

        res.status(200).json({
            success: true,

            dashboard: {
                latestSensor,
                fan,
                totalEnergy,
                recentSensors
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDashboardData
};