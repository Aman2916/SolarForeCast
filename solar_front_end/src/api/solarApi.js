// client/src/api/solarApi.js
import axios from "axios";

// Fetch historical data
export const fetchHistoricalData = async () => {
  const response = await axios.get("/api/history");
  return response.data;
};

// Send a new prediction request
export const sendPrediction = async (data) => {
  const response = await axios.post("/api/predict", data);
  return response.data;
};
