const mqtt = require("mqtt");
const dotenv = require("dotenv");

dotenv.config();

const mqttConfig = {
  host: process.env.MQTT_BROKER_HOST || "3.109.3.58",
  port: process.env.MQTT_PORT || 1883,
  protocol: "mqtt",
  username: process.env.MQTT_USERNAME || "",
  password: process.env.MQTT_PASSWORD || "",
  clientId: `mqtt_${Math.random().toString(16).slice(2)}`,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(mqttConfig);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

module.exports = client;
