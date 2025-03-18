const mqttClient = require("../config/mqtt");
const pool = require("../config/db");
const topics = require("./topics");

const setupMqttHandler = () => {
  mqttClient.on("connect", () => {
    // Subscribe to defined topics
    Object.values(topics).forEach((topic) => {
      mqttClient.subscribe(topic, { qos: 1 }, (err) => {
        if (err) console.error(`Failed to subscribe to ${topic}:`, err);
        else console.log(`Subscribed to ${topic}`);
      });
    });
  });

  mqttClient.on("message", async (topic, message) => {
    try {
      const msg = JSON.parse(message.toString());
      console.log(`Received message on ${topic}:`, msg);

      // Store the message in the database (assuming user_id is tied to a gateway or predefined)
      await pool.query(
        "INSERT INTO mqtt_data (topic, message, user_id) VALUES ($1, $2, $3)",
        [topic, msg, 1] // Replace 1 with dynamic user_id logic if needed
      );
    } catch (err) {
      console.error("Error processing MQTT message:", err);
    }
  });
};

setupMqttHandler();

module.exports = mqttClient;
