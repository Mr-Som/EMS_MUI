// controllers/gatewayController.js
const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/responseUtils");

const fetchGateways = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const result = await pool.query(
      `
      SELECT g.*
      FROM gateways g
      JOIN users u ON g.subscription_id = u.subscription_id
      WHERE u.user_id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return sendSuccess(res, [], "No gateways found for this user");
    }

    sendSuccess(res, result.rows);
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to fetch gateways");
  }
};

const addGateway = async (req, res) => {
  const {
    mac_address,
    serial_number,
    nick_name,
    project_name,
    location,
    network_mode,
    ssid_1,
    ssid_pwd_1,
    ssid_2,
    ssid_pwd_2,
    ssid_timeout,
    apn_name,
    md_protocol,
    baud_rate,
    data_bits,
    stop_bits,
    parity,
  } = req.body; // Validated by middleware

  try {
    const userResult = await pool.query(
      "SELECT subscription_id FROM users WHERE user_id = $1",
      [req.session.user.id]
    );
    if (userResult.rows.length === 0) {
      return sendError(res, 404, "User not found");
    }
    const subscription_id = userResult.rows[0].subscription_id;

    const result = await pool.query(
      `
      INSERT INTO gateways (
        mac_address, serial_number, nick_name, project_name, location,
        network_mode, ssid_1, ssid_pwd_1, ssid_2, ssid_pwd_2, ssid_timeout,
        apn_name, md_protocol, baud_rate, data_bits, stop_bits, parity,
        subscription_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
      `,
      [
        mac_address,
        serial_number,
        nick_name,
        project_name,
        location,
        network_mode,
        ssid_1,
        ssid_pwd_1,
        ssid_2,
        ssid_pwd_2,
        ssid_timeout,
        apn_name,
        md_protocol,
        baud_rate,
        data_bits,
        stop_bits,
        parity,
        subscription_id,
      ]
    );

    sendSuccess(res, result.rows[0], "Gateway added");
  } catch (err) {
    console.error(err);
    sendError(res, 400, "Failed to add gateway");
  }
};

const editGateway = async (req, res) => {
  const { gateway_id } = req.params;
  const {
    mac_address,
    serial_number,
    nick_name,
    project_name,
    location,
    network_mode,
    ssid_1,
    ssid_pwd_1,
    ssid_2,
    ssid_pwd_2,
    ssid_timeout,
    apn_name,
    md_protocol,
    baud_rate,
    data_bits,
    stop_bits,
    parity,
  } = req.body; // Validated by middleware

  try {
    const result = await pool.query(
      `
      UPDATE gateways
      SET mac_address = $1, serial_number = $2, nick_name = $3, project_name = $4,
          location = $5, network_mode = $6, ssid_1 = $7, ssid_pwd_1 = $8,
          ssid_2 = $9, ssid_pwd_2 = $10, ssid_timeout = $11, apn_name = $12,
          md_protocol = $13, baud_rate = $14, data_bits = $15, stop_bits = $16,
          parity = $17
      WHERE gateway_id = $18 AND subscription_id IN (
        SELECT subscription_id FROM users WHERE user_id = $19
      )
      RETURNING *
      `,
      [
        mac_address,
        serial_number,
        nick_name,
        project_name,
        location,
        network_mode,
        ssid_1,
        ssid_pwd_1,
        ssid_2,
        ssid_pwd_2,
        ssid_timeout,
        apn_name,
        md_protocol,
        baud_rate,
        data_bits,
        stop_bits,
        parity,
        gateway_id,
        req.session.user.id,
      ]
    );

    if (result.rowCount === 0) {
      return sendError(res, 404, "Gateway not found or not authorized");
    }

    sendSuccess(res, result.rows[0], "Gateway updated");
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to update gateway");
  }
};

const deleteGateway = async (req, res) => {
  const { gateway_ids } = req.body; // Validated by middleware

  try {
    const result = await pool.query(
      `
      DELETE FROM gateways
      WHERE gateway_id = ANY($1) AND subscription_id IN (
        SELECT subscription_id FROM users WHERE user_id = $2
      )
      RETURNING gateway_id
      `,
      [gateway_ids, req.session.user.id]
    );

    if (result.rowCount === 0) {
      return sendError(res, 404, "No gateways found or not authorized");
    }

    sendSuccess(
      res,
      { deleted: result.rows.map((row) => row.gateway_id) },
      "Gateways deleted"
    );
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to delete gateways");
  }
};

module.exports = { fetchGateways, addGateway, editGateway, deleteGateway };
