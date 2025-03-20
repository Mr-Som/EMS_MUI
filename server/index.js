const express = require("express");
const sessionConfig = require("./config/session"); // Import config object
const session = require("express-session"); // Import express-session middleware
const authRoutes = require("./routes/authRoutes");
const gatewayRoutes = require("./routes/gatewayRoutes");
const mqttRoutes = require("./routes/mqttRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(session(sessionConfig));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/gateways", gatewayRoutes);
app.use("/api/mqtt", mqttRoutes);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
