const pool = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/hashUtils");
const { sendSuccess, sendError } = require("../utils/responseUtils");

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );
    req.session.user = {
      id: result.rows[0].id,
      username: result.rows[0].username,
    };
    sendSuccess(res, { user: req.session.user }, "Signup successful");
  } catch (err) {
    sendError(res, 400, "Username already exists or invalid input");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0)
      return sendError(res, 401, "Invalid credentials");

    const user = result.rows[0];
    const isValid = await comparePassword(password, user.password);
    if (!isValid) return sendError(res, 401, "Invalid credentials");

    req.session.user = { id: user.id, username: user.username };
    sendSuccess(res, { user: req.session.user }, "Login successful");
  } catch (err) {
    sendError(res, 500, "Server error");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return sendError(res, 500, "Logout failed");
    res.clearCookie("connect.sid"); // Default session cookie name
    sendSuccess(res, null, "Logout successful");
  });
};

module.exports = { signup, login, logout };
