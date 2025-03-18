const mqtt = require("mqtt");
const dotenv = require("dotenv");

dotenv.config();

const mqttConfig = {
  host: process.env.MQTT_BROKER_URL || "mqtt://localhost", // MQTT broker URL from .env
  port: process.env.MQTT_PORT || 1883, // Default MQTT port
  username: process.env.MQTT_USERNAME || "", // Optional MQTT credentials
  password: process.env.MQTT_PASSWORD || "",
  clientId: `mqtt_${Math.random().toString(16).slice(2)}`, // Unique client ID
  reconnectPeriod: 1000, // Reconnect after 1 second if disconnected
};

const client = mqtt.connect(mqttConfig.host, mqttConfig);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

module.exports = client;
