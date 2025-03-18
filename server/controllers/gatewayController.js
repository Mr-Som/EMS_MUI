const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/responseUtils");

const fetchGateways = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM gateways WHERE user_id = $1",
      [req.session.user.id]
    );
    sendSuccess(res, result.rows);
  } catch (err) {
    sendError(res, 500, "Failed to fetch gateways");
  }
};

const addGateway = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO gateways (name, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [name, description, req.session.user.id]
    );
    sendSuccess(res, result.rows[0], "Gateway added");
  } catch (err) {
    sendError(res, 400, "Failed to add gateway");
  }
};

const editGateway = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE gateways SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [name, description, id, req.session.user.id]
    );
    if (result.rowCount === 0) return sendError(res, 404, "Gateway not found");
    sendSuccess(res, result.rows[0], "Gateway updated");
  } catch (err) {
    sendError(res, 500, "Failed to update gateway");
  }
};

const deleteGateway = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM gateways WHERE id = $1 AND user_id = $2",
      [id, req.session.user.id]
    );
    if (result.rowCount === 0) return sendError(res, 404, "Gateway not found");
    sendSuccess(res, null, "Gateway deleted");
  } catch (err) {
    sendError(res, 500, "Failed to delete gateway");
  }
};

module.exports = { fetchGateways, addGateway, editGateway, deleteGateway };
