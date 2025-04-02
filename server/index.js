const express = require("express");
const sessionConfig = require("./config/session");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const gatewayRoutes = require("./routes/gatewayRoutes");
const meterRoutes = require("./routes/meterRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

// Ensure uploads/meters directory exists
const meterUploadDir = path.join(__dirname, "uploads", "meters");
if (!fs.existsSync(meterUploadDir)) {
  fs.mkdirSync(meterUploadDir, { recursive: true });
}

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(session(sessionConfig));

// Serve static files (e.g., uploaded thumbnails)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gateways", gatewayRoutes);
app.use("/api/meters", meterRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Something went wrong" });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
});
