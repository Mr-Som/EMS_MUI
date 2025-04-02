const pool = require("../config/db");

async function validateGateway(req, res, next) {
  const { mac_address } = req.body;

  try {
    const result = await pool.query(
      `SELECT EXISTS (
        SELECT 1 FROM gateways g
        JOIN subscriptions s ON g.subscription_id = s.subscription_id
        WHERE g.mac_address = $1 
          AND s.expiry_date > NOW() 
          AND s.payment_status = 'paid'
      ) AS is_valid`,
      [mac_address]
    );

    if (!result.rows[0].is_valid) {
      return res.status(403).json({ error: "Invalid or unpaid subscription" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Database validation failed" });
  }
}

module.exports = validateGateway;
