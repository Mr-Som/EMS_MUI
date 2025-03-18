const pool = require("../config/db");

const createMqttDataTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS mqtt_data (
      id SERIAL PRIMARY KEY,
      topic VARCHAR(255) NOT NULL,
      message JSONB NOT NULL,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("MqttData table created or already exists");
  } catch (err) {
    console.error("Error creating mqtt_data table:", err);
  }
};

createMqttDataTable();

module.exports = pool;
