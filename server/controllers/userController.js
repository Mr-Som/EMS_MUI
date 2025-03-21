const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/responseUtils");

// Fetch all users
const fetchUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id, first_name, last_name, email, role, department, phone, active AS status, last_login FROM users"
    );
    if (result.rows.length === 0) {
      return sendError(res, 404, "No users found.");
    }
    sendSuccess(res, result.rows, "Users fetched successfully.");
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to fetch users.");
  }
};

const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return sendError(res, 400, "Name, email, and password are required.");
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, password] // Password should be hashed in real-world applications
    );
    sendSuccess(res, result.rows[0], "User added successfully.");
  } catch (err) {
    console.error(err);
    sendError(res, 400, "Failed to add user. Email might already be in use.");
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  // Ensure at least one field is being updated
  if (!name && !email && !password) {
    return sendError(
      res,
      400,
      "At least one field must be provided to update."
    );
  }

  try {
    const result = await pool.query(
      "UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE id = $4 RETURNING id, name, email",
      [name, email, password, id]
    );
    if (result.rowCount === 0) {
      return sendError(res, 404, "User not found.");
    }
    sendSuccess(res, result.rows[0], "User updated successfully.");
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to update user.");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );
    if (result.rowCount === 0) {
      return sendError(res, 404, "User not found.");
    }
    sendSuccess(res, null, "User deleted successfully.");
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to delete user.");
  }
};

module.exports = { fetchUsers, addUser, editUser, deleteUser };
