import mqtt from 'mqtt';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();
const mqttBrokerUrl = process.env.MQTT_BROKER_URL;
const mongoDB_URL = process.env.MONGODB_URL;

let mqttClient;

// Connect to MongoDB Atlas Cluster
async function connectToCluster(mongoDB_URL) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(mongoDB_URL);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

// Create a document in the specified MongoDB collection
async function createDocument(collection, document) {
    await collection.insertOne(document);
}

// Perform CRUD operations on the MongoDB database
async function insertMQTTdata(message) {
    let mongoClient;

    try {
        const parsedMessage = JSON.parse(message.toString()); // Parse the JSON message
        const { ID, data, TS, DT } = parsedMessage; // Destructure the parsed message

        mongoClient = await connectToCluster(mongoDB_URL);
        const db = mongoClient.db('emsTestDB');
        const collection = db.collection('e2m2_data');

        console.log('Inserting data into the database...');
        const document = {
            ID,
            data,
            TS,
            DT
        };
        await createDocument(collection, document);
        console.log('Data inserted successfully!!');
    } catch (error) {
        console.error('Error inserting data into the database:', error);
    } finally {
        if (mongoClient) {
            await mongoClient.close();
        }
    }
}

// Connect to MQTT broker and handle messages
async function connectToMqtt() {
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

// Subscribe to MQTT topics
async function subscribeToTopic(topics) {
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
