let debugSubscriptions = new Set();

async function subscribeDebug(mqttClient, macAddresses, pool) {
  try {
    const currentSubscriptions = new Set();

    // Fetch gateways with error state (placeholder: assumes 'error_state' column exists)
    const errorGateways = await pool.query(
      `
      SELECT mac_address
      FROM gateways
      WHERE mac_address = ANY($1) AND error_state = true
      `,
      [macAddresses]
    );

    const errorMacs = errorGateways.rows.map((row) => row.mac_address);

    // Subscribe to /debug topics for gateways in error state
    errorMacs.forEach((mac_address) => {
      const prefixedMac = `TN-${mac_address}`;
      const topic = `${prefixedMac}/debug`;
      currentSubscriptions.add(topic);

      if (!debugSubscriptions.has(topic)) {
        mqttClient.subscribe(topic, { qos: 1 }, (err) => {
          if (err) {
            console.error(`Failed to subscribe to ${topic}:`, err);
          } else {
            debugSubscriptions.add(topic);
            console.log(`Subscribed to ${topic}`);
          }
        });
      }
    });

    // Unsubscribe from topics no longer in error state
    debugSubscriptions.forEach((topic) => {
      if (!currentSubscriptions.has(topic)) {
        mqttClient.unsubscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to unsubscribe from ${topic}:`, err);
          } else {
            debugSubscriptions.delete(topic);
            console.log(`Unsubscribed from ${topic}`);
          }
        });
      }
    });

    console.log(`Total debug subscriptions: ${debugSubscriptions.size}`);
  } catch (err) {
    console.error("Error subscribing to debug topics:", err);
  }
}

module.exports = { subscribeDebug, debugSubscriptions };
