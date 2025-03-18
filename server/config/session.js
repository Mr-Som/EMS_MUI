const session = require("express-session");
const PostgreSqlStore = require("connect-pg-simple")(session);
const pool = require("./db"); // Import the PostgreSQL pool
const dotenv = require("dotenv");

dotenv.config();

const sessionConfig = {
  store: new PostgreSqlStore({
    pool: pool, // Use the existing PostgreSQL connection pool
    tableName: "sessions", // Table to store sessions (create this in your DB if not already)
    createTableIfMissing: true, // Auto-create the sessions table if it doesn’t exist
  }),
  secret: process.env.SESSION_SECRET || "your-default-secret", // Secret for signing the session ID cookie
  resave: false, // Don’t save session if unmodified
  saveUninitialized: false, // Don’t create session until something is stored
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 1000 * 60 * 60 * 24, // Session expires in 24 hours
  },
};

module.exports = sessionConfig;
