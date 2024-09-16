const express = require("express");
const bodyParser = require("body-parser");
const solarRoutes = require("./routes/solar");

const app = express();
const port = 5000; // Server port

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse incoming JSON requests
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
  })
);

// Use the solar routes
app.use("/api", solarRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
