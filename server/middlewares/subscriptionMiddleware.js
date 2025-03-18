const pool = require("../config/db");
const { sendError } = require("../utils/responseUtils");

const checkGatewaySubscription = async (req, res, next) => {
  const { gatewayId } = req.params; // Assuming gateway ID is in params
  try {
    const result = await pool.query(
      "SELECT * FROM gateways WHERE id = $1 AND user_id = $2",
      [gatewayId, req.session.user.id]
    );
    if (result.rowCount === 0) {
      return sendError(res, 403, "Forbidden: Invalid or unauthorized gateway");
    }
    req.gateway = result.rows[0]; // Attach gateway to request for downstream use
    next();
  } catch (err) {
    sendError(res, 500, "Server error");
  }
};

module.exports = { checkGatewaySubscription };
