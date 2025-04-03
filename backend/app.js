// app.js - MQTT to PostgreSQL Bridge
require("dotenv").config();
const logger = require("./utils/logger");
const mqttClient = require("./config/mqtt");
const pool = require("./config/db");
const syncSubscriptions = require("./services/syncSubscriptions");
const setupDataHandler = require("./handlers/dataHandler");

// Configuration
const SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// Initialize the system
async function initialize() {
  try {
    // Verify database connection
    await pool.query("SELECT 1");
    logger.info("Database connection established");

    // Setup MQTT message handler
    setupDataHandler(mqttClient);

    // Initial subscription sync
    await syncSubscriptions(mqttClient);

    // Setup periodic sync
    const syncInterval = setInterval(async () => {
      try {
        await syncSubscriptions(mqttClient);
      } catch (err) {
        logger.error("Periodic sync failed:", err);
      }
    }, SYNC_INTERVAL_MS);

    // Graceful shutdown
    const shutdown = async () => {
      logger.info("Shutting down gracefully...");
      clearInterval(syncInterval);
      mqttClient.end();
      await pool.end();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    logger.info("MQTT Subscriber Service started successfully");
  } catch (err) {
    logger.error("Initialization failed:", err);
    process.exit(1);
  }
}

// Start the application
initialize().catch((err) => {
  logger.error("Fatal initialization error:", err);
  process.exit(1);
});
