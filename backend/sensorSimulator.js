const axios = require("axios");

const generateSensorData = () => {
    const temperature = Number(
        (25 + Math.random() * 10).toFixed(1)
    );

    const humidity = Math.floor(
        40 + Math.random() * 41
    );

    const occupancy = Math.random() > 0.3;

    return {
        temperature,
        humidity,
        occupancy
    };
};

const sendSensorData = async () => {
    try {
        const sensorData = generateSensorData();

        console.log("Sending sensor data:", sensorData);

        const response = await axios.post(
            "http://localhost:5000/api/sensors",
            sensorData
        );

        console.log(
            "Server response:",
            response.data.message
        );

    } catch (error) {
        console.error(
            "Failed to send sensor data:",
            error.message
        );
    }
};

// Send data every 10 seconds
setInterval(sendSensorData, 10000);

// Send immediately
sendSensorData();