const pool = require("../config/db");

const createGatewaysTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS gateways (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("Gateways table created or already exists");
  } catch (err) {
    console.error("Error creating gateways table:", err);
  }
};

createGatewaysTable();

module.exports = pool;
