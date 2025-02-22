const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./db');
const DataModel = require('./models/dataModel');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL.replace(/\/$/, ''), // Remove trailing slash if present
        methods: ['GET', 'POST'],
    },
});

const PORT = process.env.PORT || 3002;
const allowedOrigins = [process.env.FRONTEND_URL.replace(/\/$/, ''), 'http://192.168.1.16:3000'];

app.use(bodyParser.json());

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) { // Remove trailing slash if present
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization'],
        credentials: true,
    })
);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.post('/data', async (req, res) => {
    try {
        const data = await DataModel.find().sort({ TS: -1 }).limit(10);
        io.emit('dataUpdate', data); // Emit data update event
        res.json(data);
    } catch (err) {
        console.error('Error:', err.message); // Log the error
        res.status(500).json({ message: err.message });
    }
});

connectDB();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
