let dataSubscriptions = new Set();

async function subscribeData(mqttClient, macAddresses) {
  try {
    const currentSubscriptions = new Set();

    // Subscribe to /data topics
    macAddresses.forEach((mac_address) => {
      const prefixedMac = `TN-${mac_address}`; // e.g., "TN-30:C9:22:A6:8B:98"
      const topic = `${prefixedMac}/data`;
      currentSubscriptions.add(topic);

      if (!dataSubscriptions.has(topic)) {
        mqttClient.subscribe(topic, { qos: 1 }, (err) => {
          if (err) {
            console.error(`Failed to subscribe to ${topic}:`, err);
          } else {
            dataSubscriptions.add(topic);
            console.log(`Subscribed to ${topic}`);
          }
        });
      }
    });

    // Unsubscribe from removed topics
    dataSubscriptions.forEach((topic) => {
      if (!currentSubscriptions.has(topic)) {
        mqttClient.unsubscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to unsubscribe from ${topic}:`, err);
          } else {
            dataSubscriptions.delete(topic);
            console.log(`Unsubscribed from ${topic}`);
          }
        });
      }
    });

    console.log(`Total data subscriptions: ${dataSubscriptions.size}`);
  } catch (err) {
    console.error("Error subscribing to data topics:", err);
  }
}

module.exports = { subscribeData, dataSubscriptions };
