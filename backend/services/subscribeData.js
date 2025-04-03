const subscriptions = new Set();

async function subscribeData(mqttClient, macAddresses) {
  const newSubs = new Set();

  // Add new subscriptions
  for (const mac of macAddresses) {
    const topic = `TN-${mac}/data`;
    newSubs.add(topic);

    if (!subscriptions.has(topic)) {
      await new Promise((resolve) => {
        mqttClient.subscribe(topic, { qos: 1 }, (err) => {
          if (err) logger.error(`Subscribe failed: ${topic}`, err);
          else subscriptions.add(topic);
          resolve();
        });
      });
    }
  }

  // Remove stale subscriptions
  for (const topic of subscriptions) {
    if (!newSubs.has(topic)) {
      await new Promise((resolve) => {
        mqttClient.unsubscribe(topic, (err) => {
          if (err) logger.error(`Unsubscribe failed: ${topic}`, err);
          else subscriptions.delete(topic);
          resolve();
        });
      });
    }
  }
}

module.exports = subscribeData;
