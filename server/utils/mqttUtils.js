const parseMqttMessage = (message) => {
  try {
    return JSON.parse(message.toString());
  } catch (err) {
    console.error("Failed to parse MQTT message:", err);
    return null;
  }
};

module.exports = { parseMqttMessage };
