// middlewares/subscriptionMiddleware.js
const pool = require("../config/db");
const { sendError } = require("../utils/responseUtils");

const checkSubscriptionLimit = async (req, res, next) => {
  const userId = req.session.user.id;
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
};

module.exports = checkSubscriptionLimit;
