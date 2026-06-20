const express = require("express");
const cors = require("cors");
require("dotenv").config();

const signalRoutes = require("./routes/signalRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Server is Running 🚀");
});

// Signal Routes
app.use("/api/signals", signalRoutes);

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});