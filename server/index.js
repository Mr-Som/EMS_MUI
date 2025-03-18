const express = require("express");
const session = require("../config/session");
const authRoutes = require("./routes/authRoutes");
const gatewayRoutes = require("./routes/gatewayRoutes");
const mqttRoutes = require("./routes/mqttRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(session);

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/gateways", gatewayRoutes);
app.use("/api/mqtt", mqttRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
