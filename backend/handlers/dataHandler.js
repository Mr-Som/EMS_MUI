// handlers/dataHandler.js
const pool = require("../config/db");
const logger = require("../utils/logger");

function setupDataHandler(mqttClient) {
  mqttClient.on("message", async (topic, message) => {
    try {
      // 1. Validate topic format
      if (!topic.endsWith("/data") || !topic.startsWith("TN-")) return;

      // 2. Extract and clean MAC address from topic
      const topicMac = topic.split("/")[0].replace("TN-", "");

      // 3. Parse message and clean ID MAC
      const { data, ID } = JSON.parse(message.toString());
      const messageMac = ID.replace("TN-", "");

      // 4. Verify MAC addresses match
      if (topicMac !== messageMac) {
        logger.warn(`MAC mismatch: Topic ${topicMac} vs Message ${messageMac}`);
        return;
      }

      // 5. Transform data to match table columns
      const transformedData = {};
      for (const [key, value] of Object.entries(data)) {
        const regNumber = key.split("_")[1]; // Extract number from MD1_40099
        transformedData[`reg_${regNumber}`] = value;
      }

      // 6. Get meter_id using MAC address only
      const meterRes = await pool.query(
        "SELECT meter_id FROM meters WHERE mac_address = $1",
        [messageMac]
      );

      if (meterRes.rows.length === 0) {
        logger.warn(`No meter found for MAC ${messageMac}`);
        return;
      }
      const meterId = meterRes.rows[0].meter_id;

      // 7. Insert into hypertable (created_at will be auto-generated)
      const columns = [...Object.keys(transformedData), "meter_id"].join(", ");
      const values = [...Object.values(transformedData), meterId];
      const valuePlaceholders = values.map((_, i) => `$${i + 1}`).join(", ");

      const query = `
        INSERT INTO data_elite103 (${columns})
        VALUES (${valuePlaceholders})
      `;

      await pool.query(query, values);
      logger.debug(`Stored data from MAC ${messageMac} (meter: ${meterId})`);
    } catch (err) {
      logger.error(`Error processing message from ${topic}:`, err);
    }
  });
}

module.exports = setupDataHandler;
