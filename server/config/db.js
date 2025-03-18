const { Pool } = require("pg"); // Use pg's Pool for connection pooling
const dotenv = require("dotenv"); // Load environment variables

dotenv.config();

const config = {
  user: process.env.PG_USER, // Database username
  password: process.env.PG_PASSWORD, // Database password
  host: process.env.PG_HOST, // Database host
  port: process.env.PG_PORT, // Database port
  database: process.env.PG_DATABASE, // Database name
  ssl: {
    rejectUnauthorized: true, // Ensure secure SSL connection
    ca: process.env.PG_SSL_CERT, // SSL certificate from .env (multi-line cert works here)
  },
};

const pool = new Pool(config);

module.exports = pool;
