const mqtt = require("mqtt");
const dotenv = require("dotenv");

dotenv.config();

const mqttConfig = {
  host: process.env.MQTT_BROKER_HOST || "test.mosquitto.org", // Just the hostname
  port: process.env.MQTT_PORT || 1883, // Default MQTT port
  protocol: "mqtt", // Explicitly specify protocol
  username: process.env.MQTT_USERNAME || "",
  password: process.env.MQTT_PASSWORD || "",
  clientId: `mqtt_${Math.random().toString(16).slice(2)}`,
  reconnectPeriod: 1000, // Reconnect after 1 second if disconnected
};

const client = mqtt.connect(mqttConfig); // Pass the entire config object

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

module.exports = client;
