const { spawn } = require("child_process");

const getPrediction = (req, res) => {
  const {
    air_temp,
    clearsky_dhi,
    clearsky_dni,
    clearsky_ghi,
    cloud_opacity,
    precipitation_rate,
    relative_humidity,
    hour,
    day,
    month,
    day_of_week,
    year,
  } = req.body; // Extract form data from request body

  console.log(req.body.air_temp);
  // Ensure that all necessary fields are provided in the request body
  if (
    !air_temp ||
    !clearsky_dhi ||
    !clearsky_dni ||
    !clearsky_ghi ||
    !cloud_opacity ||
    !precipitation_rate ||
    !relative_humidity ||
    !hour ||
    !day ||
    !month ||
    !day_of_week ||
    !year
  ) {
    return res.status(400).json({ error: "All input fields are required" });
  }

  // Convert form data to float or integers as necessary (sanitizing inputs)
  const args = [
    air_temp.toString(),
    clearsky_dhi.toString(),
    clearsky_dni.toString(),
    clearsky_ghi.toString(),
    cloud_opacity.toString(),
    precipitation_rate.toString(),
    relative_humidity.toString(),
    hour.toString(),
    day.toString(),
    month.toString(),
    day_of_week.toString(),
    year.toString(),
  ];

  const python = spawn("python", ["./model/solar_predict.py", ...args]);

  python.stdout.on("data", (data) => {
    console.log(`Python output: ${data.toString()}`);
    try {
      const prediction = JSON.parse(data);
      res.json({ prediction });
    } catch (err) {
      console.error("Error parsing prediction result:", err);
      res.status(500).json({ error: "Failed to parse prediction result" });
    }
  });

  python.stderr.on("data", (data) => {
    console.error(`Python error: ${data.toString()}`);
    res.status(500).json({ error: "Prediction failed" });
  });

  python.on("close", (code) => {
    console.log(`Python process closed with code ${code}`);
  });
};

module.exports = { getPrediction };
