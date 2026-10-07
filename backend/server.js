const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const sensorRoutes = require("./routes/sensorRoutes");
const fanRoutes = require("./routes/fanRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/sensors", sensorRoutes);
app.use("/api/fan", fanRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SmartFan OS Backend is running!"
    });
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});