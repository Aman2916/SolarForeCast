import { useState } from "react";
import { sendPrediction } from "../api/solarApi"; // Import the API function

const SolarPredictionForm = ({ loading }) => {
  const [formData, setFormData] = useState({
    air_temp: "",
    clearsky_dhi: "",
    clearsky_dni: "",
    clearsky_ghi: "",
    cloud_opacity: "",
    precipitation_rate: "",
    relative_humidity: "",
    hour: "",
    day: "",
    month: "",
    day_of_week: "",
    year: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData.air_temp);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await sendPrediction(formData);
      setPrediction(response.prediction);
    } catch (error) {
      console.error("Error in prediction request:", error);
    } finally {
      setIsLoading(false); // Reset loading to false after the request completes
    }
  };

  return (
    <div>
      <h2>Solar Prediction</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <label htmlFor="air_temp">Temperature</label>
        <input
          name="air_temp"
          id="air_temp"
          value={formData.air_temp}
          placeholder="Temperature"
          onChange={handleChange}
        />

        <label htmlFor="clearsky_dni">Clear Sky DNI</label>
        <input
          name="clearsky_dni"
          id="clearsky_dni"
          placeholder="Clear Sky DNI"
          value={formData.clearsky_dni}
          onChange={handleChange}
        />

        <label htmlFor="clearsky_dhi">Clear Sky DHI</label>
        <input
          name="clearsky_dhi"
          id="clearsky_dhi"
          placeholder="Clear Sky DHI"
          value={formData.clearsky_dhi}
          onChange={handleChange}
        />

        <label htmlFor="clearsky_ghi">Clear Sky GHI</label>
        <input
          name="clearsky_ghi"
          id="clearsky_ghi"
          placeholder="Clear Sky GHI"
          value={formData.clearsky_ghi}
          onChange={handleChange}
        />

        <label htmlFor="cloud_opacity">Cloud Opacity</label>
        <input
          name="cloud_opacity"
          id="cloud_opacity"
          placeholder="Cloud Opacity"
          value={formData.cloud_opacity}
          onChange={handleChange}
        />

        <label htmlFor="precipitation_rate">Precipitation</label>
        <input
          name="precipitation_rate"
          id="precipitation_rate"
          placeholder="Precipitation"
          value={formData.precipitation_rate}
          onChange={handleChange}
        />

        <label htmlFor="relative_humidity">Humidity</label>
        <input
          name="relative_humidity"
          id="relative_humidity"
          placeholder="Humidity"
          value={formData.relative_humidity}
          onChange={handleChange}
        />

        <label htmlFor="hour">Hour</label>
        <input
          name="hour"
          id="hour"
          placeholder="Hour"
          value={formData.hour}
          onChange={handleChange}
        />

        <label htmlFor="day">Day</label>
        <input
          name="day"
          id="day"
          placeholder="Day"
          value={formData.day}
          onChange={handleChange}
        />

        <label htmlFor="month">Month</label>
        <input
          name="month"
          id="month"
          placeholder="Month"
          value={formData.month}
          onChange={handleChange}
        />

        <label htmlFor="day_of_week">Day of Week</label>
        <input
          name="day_of_week"
          id="day_of_week"
          placeholder="Day of Week"
          value={formData.day_of_week}
          onChange={handleChange}
        />

        <label htmlFor="year">Year</label>
        <input
          name="year"
          id="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Predicting..." : "Predict Solar Radiation"}
        </button>
      </form>

      {prediction && (
        <div>
          <h3>Prediction Result</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default SolarPredictionForm;
