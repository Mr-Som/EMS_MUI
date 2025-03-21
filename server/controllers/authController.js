const pool = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/hashUtils");
const { sendSuccess, sendError } = require("../utils/responseUtils");

const signup = async (req, res) => {
  const { email, phone, firstName, lastName, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      "INSERT INTO users (email, phone, first_name, last_name, pwd_hash) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, email",
      [email, phone, firstName, lastName, hashedPassword]
    );
    const user = result.rows[0];
    sendSuccess(
      res,
      { user: { id: user.user_id, email: user.email } },
      "Signup successful"
    );
  } catch (err) {
    //console.error("Signup error:", err.stack);
    sendError(res, 400, "Email already exists or invalid input");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body; // username can be email or phone
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR phone = $1",
      [username]
    );
    if (result.rows.length === 0)
      return sendError(res, 401, "Invalid credentials");

    const user = result.rows[0];
    const isValid = await comparePassword(password, user.pwd_hash);

    if (!isValid) return sendError(res, 401, "Invalid credentials");

    // Update users table with active = true and last_login
    await pool.query(
      "UPDATE users SET active = true, last_login = CURRENT_TIMESTAMP WHERE user_id = $1",
      [user.user_id]
    );

    // Store session data in req.session
    req.session.user = { id: user.user_id, email: user.email };
    req.session.login_time = new Date();
    req.session.active = true;
    sendSuccess(res, { user: req.session.user }, "Login successful");
  } catch (err) {
    sendError(res, 500, "Server error");
  }
};

const logout = (req, res) => {
  if (!req.session.user) return sendError(res, 400, "No active session");

  const userId = req.session.user.id;

  req.session.destroy(async (err) => {
    if (err) {
      return sendError(res, 500, "Logout failed");
    }

    try {
      // Update users table with active = false after logout
      await pool.query("UPDATE users SET active = false WHERE user_id = $1", [
        userId,
      ]);
      res.clearCookie("connect.sid");
      sendSuccess(res, null, "Logout successful");
    } catch (err) {
      sendError(res, 500, "Logout failed");
    }
  });
};

module.exports = { signup, login, logout };
