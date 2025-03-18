const pool = require("../config/db");
const mqttClient = require("../config/mqtt");
const { sendSuccess, sendError } = require("../utils/responseUtils");

const getMqttData = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM mqtt_data WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100",
      [req.session.user.id]
    );
    sendSuccess(res, result.rows);
  } catch (err) {
    sendError(res, 500, "Failed to fetch MQTT data");
  }
};

const publishMessage = (req, res) => {
  const { topic, message } = req.body;
  try {
    mqttClient.publish(topic, JSON.stringify(message), { qos: 1 }, (err) => {
      if (err) return sendError(res, 500, "Failed to publish message");
      sendSuccess(res, null, "Message published successfully");
    });
  } catch (err) {
    sendError(res, 500, "Server error");
  }
};

module.exports = { getMqttData, publishMessage };
