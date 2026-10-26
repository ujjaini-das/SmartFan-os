import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDashboard = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};

export const getSensorHistory = async () => {
  const response = await API.get("/sensors/history");
  return response.data;
};

export const getFanStatus = async () => {
  const response = await API.get("/fan/status");
  return response.data;
};

export const controlFan = async (speed, mode = "MANUAL") => {
  const response = await API.post("/fan/control", {
    speed,
    mode,
  });

  return response.data;
};

export const autoControlFan = async (
  temperature,
  humidity,
  occupancy
) => {
  const response = await API.post("/fan/auto-control", {
    temperature,
    humidity,
    occupancy,
  });

  return response.data;
};

export default API;