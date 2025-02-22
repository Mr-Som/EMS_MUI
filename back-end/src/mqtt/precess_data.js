import { MongoClient } from 'mongodb';

// Connect to MongoDB Atlas Cluster
export async function connectToCluster(mongoDB_URL) {
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
export async function createDocument(collection, document) {
    await collection.insertOne(document);
}

// Perform CRUD operations on the MongoDB database
export async function insertMQTTdata(message) {
    const mongoDB_URL = process.env.MONGODB_URL;
    let mongoClient;

    try {
        const parsedMessage = JSON.parse(message); // Parse the JSON message
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
