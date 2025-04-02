let statusSubscriptions = new Set();

async function subscribeStatus(mqttClient, macAddresses) {
  try {
    const currentSubscriptions = new Set();

    // Subscribe to /status topics
    macAddresses.forEach((mac_address) => {
      const prefixedMac = `TN-${mac_address}`;
      const topic = `${prefixedMac}/status`;
      currentSubscriptions.add(topic);

      if (!statusSubscriptions.has(topic)) {
        mqttClient.subscribe(topic, { qos: 1 }, (err) => {
          if (err) {
            console.error(`Failed to subscribe to ${topic}:`, err);
          } else {
            statusSubscriptions.add(topic);
            console.log(`Subscribed to ${topic}`);
          }
        });
      }
    });

    // Unsubscribe from removed topics
    statusSubscriptions.forEach((topic) => {
      if (!currentSubscriptions.has(topic)) {
        mqttClient.unsubscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to unsubscribe from ${topic}:`, err);
          } else {
            statusSubscriptions.delete(topic);
            console.log(`Unsubscribed from ${topic}`);
          }
        });
      }
    });

    console.log(`Total status subscriptions: ${statusSubscriptions.size}`);
  } catch (err) {
    console.error("Error subscribing to status topics:", err);
  }
}

module.exports = { subscribeStatus, statusSubscriptions };
