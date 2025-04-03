const logger = require("../utils/logger");
const pool = require("../config/db");

let isSyncing = false;

async function getValidMacs() {
  const result = await pool.query(`
    SELECT g.mac_address
    FROM gateways g
    JOIN subscriptions s ON g.subscription_id = s.subscription_id
    WHERE s.expiry_date > NOW() 
      AND s.payment_status = 'paid'
  `);
  return result.rows.map((row) => row.mac_address);
}

async function syncSubscriptions(mqttClient) {
  if (isSyncing) return;
  isSyncing = true;

  try {
    const validMacs = await getValidMacs();
    logger.info(`Syncing ${validMacs.length} devices`);

    await Promise.allSettled([
      require("./subscribeData")(mqttClient, validMacs),
    ]);
  } catch (err) {
    logger.error("Sync failed:", err);
  } finally {
    isSyncing = false;
  }
}

module.exports = syncSubscriptions;
