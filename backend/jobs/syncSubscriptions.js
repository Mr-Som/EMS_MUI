//syncSubscriptions.js
async function syncSubscriptions(mqttClient, pool) {
  try {
    // Step 1: Validate subscriptions and get valid MAC addresses
    const validMacs = await validateSubscriptions(pool);

    // Step 2: Subscribe to each topic type
    await subscribeData(mqttClient, validMacs);
    await subscribeDebug(mqttClient, validMacs, pool); // Pass pool for error state check
    await subscribeStatus(mqttClient, validMacs);

    console.log("Subscription sync completed");
  } catch (err) {
    console.error("Error in syncSubscriptions:", err);
  }
}

module.exports = { syncSubscriptions };
