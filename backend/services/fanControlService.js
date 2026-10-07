const calculateFanSpeed = (temperature, humidity, occupancy) => {

    // Nobody is present
    if (!occupancy) {
        return {
            speed: 0,
            status: "OFF",
            reason: "No person detected"
        };
    }

    let speed;

    // Temperature-based control
    if (temperature < 27) {
        speed = 1;
    } else if (temperature < 30) {
        speed = 3;
    } else {
        speed = 4;
    }

    // Humidity adjustment
    if (humidity > 70 && speed < 5) {
        speed += 1;
    }

    return {
        speed,
        status: "ON",
        reason: getReason(temperature, humidity, speed)
    };
};


// Generate a human-readable explanation
const getReason = (temperature, humidity, speed) => {

    if (temperature >= 30 && humidity > 70) {
        return "High temperature and high humidity";
    }

    if (temperature >= 30) {
        return "High temperature";
    }

    if (humidity > 70) {
        return "High humidity";
    }

    if (temperature < 27) {
        return "Comfortable temperature";
    }

    return "Moderate temperature";
};


module.exports = {
    calculateFanSpeed
};