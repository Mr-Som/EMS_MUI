const pool = require("../config/db");
const { sendError } = require("../utils/responseUtils");

// Check gateway limit for the user's subscription
const checkGatewayLimit = async (req, res, next) => {
  const userId = req.session.user.id;
  try {
    const result = await pool.query(
      `
      SELECT s.gateway_count, COUNT(g.gateway_id) as current_count
      FROM subscriptions s
      LEFT JOIN gateways g ON s.subscription_id = g.subscription_id
      JOIN users u ON s.subscription_id = u.subscription_id
      WHERE u.user_id = $1
      GROUP BY s.subscription_id, s.gateway_count
      `,
      [userId]
    );

    const { gateway_count, current_count } = result.rows[0] || {
      gateway_count: 0,
      current_count: 0,
    };

    if (current_count >= gateway_count) {
      return sendError(res, 403, "Subscription gateway limit reached");
    }
    next();
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to check gateway limit");
  }
};

// Check meter limit for the user's subscription
const checkMeterLimit = async (req, res, next) => {
  const userId = req.session.user.id;
  try {
    const result = await pool.query(
      `
      SELECT s.meter_count, COUNT(m.meter_id) as current_count
      FROM subscriptions s
      LEFT JOIN meters m ON s.subscription_id = m.subscription_id
      JOIN users u ON s.subscription_id = u.subscription_id
      WHERE u.user_id = $1
      GROUP BY s.subscription_id, s.meter_count
      `,
      [userId]
    );

    const { meter_count, current_count } = result.rows[0] || {
      meter_count: 0,
      current_count: 0,
    };

    if (current_count >= meter_count) {
      return sendError(res, 403, "Subscription meter limit reached");
    }
    next();
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to check meter limit");
  }
};

module.exports = { checkGatewayLimit, checkMeterLimit };
