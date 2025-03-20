const session = require("express-session");
const PostgreSqlStore = require("connect-pg-simple")(session);
const pool = require("./db");

const sessionConfig = {
  store: new PostgreSqlStore({
    pool: pool,
    tableName: "sessions",
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
};

module.exports = sessionConfig;
