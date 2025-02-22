import mqtt from 'mqtt';
import { config } from 'dotenv';
import { insertMQTTdata } from './process_data.js'; // Corrected path

config();
const mqttBrokerUrl = process.env.MQTT_BROKER_URL;

let mqttClient;

export async function connectToMqtt() {
    const topics = [
        'TN-30:C9:22:A6:8B:98/data'
    ];

    try {
        mqttClient = mqtt.connect(mqttBrokerUrl);
        console.log('Connecting to MQTT Broker...');

        mqttClient.on('connect', async () => {
            console.log('Successfully connected to MQTT Broker!');
            await subscribeToTopic(topics);
        });

        mqttClient.on('error', (error) => {
            console.error('Connection to MQTT Broker failed!', error);
        });

        mqttClient.on('message', async (topic, message) => {
            console.log(`Message received on topic ${topic}: ${message.toString()}`);
            await insertMQTTdata(message);
            console.log('Data inserted to database');
        });

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        process.exit();
    }

    return mqttClient;
}

export async function subscribeToTopic(topics) {
    try {
        for (let topic of topics) {
            await mqttClient.subscribe(topic, (err) => {
                if (err) {
                    console.error(`Failed to subscribe to topic ${topic}:`, err);
                } else {
                    console.log(`Subscribed to topic ${topic}`);
                }
            });
        }
    } catch (error) {
        console.error('An error occurred while subscribing to topics:', error);
    }
}

// Start the MQTT connection
connectToMqtt();
