# MQTT to Database

A Node.js application for handling MQTT messages, sotre mqtt massages to PostgreSQL and webscoket for real-time monitoring.

## Prerequisites

- Node.js
- PostgreSQL (configured via Aiven or local instance)
- MQTT Broker

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Configure `.env` with your credentials (see `.env` example below).
4. Start the server: `npm start`.

## Environment Variables

- `PG_USER`, `PG_PASSWORD`, `PG_HOST`, `PG_PORT`, `PG_DATABASE`, `PG_SSL_CERT`: PostgreSQL connection details.
- `MQTT_BROKER_URL`, `MQTT_PORT`, `MQTT_USERNAME`, `MQTT_PASSWORD`: MQTT broker connection details.
- `SESSION_SECRET`: Secret key for session encryption.
- `PORT`: Server port (e.g., 3000).

## Directory Structure

Here’s the updated structure with brief descriptions and use cases for each file:

```python

backend/
│
├── config/
│   ├── env.config.js       # Validates & exports env vars
│   ├── db.js               # Database config
│   ├── mqtt.js             # MQTT client config
│   └── redis.js            # (Future) Redis config
│
├── services/
│   |
│   ├── handlers/       # Message processors
│   │   ├── dataHandler.js
│   │   ├── debugHandler.js
│   │   └── statusHandler.js
│   │
│   ├── subscriptions/  # Topic management
│   │   ├── subscribeData.js
│   │   ├── subscribeDebug.js
│   │   └── subscribeStatus.js
│   │
│   └── subscriptionService.js # DB validation
│
├── controllers/
│   ├── dataController.js    # Internal /data logic
│   ├── debugController.js   # (Future) /debug API
│   └── statusController.js  # (Future) /status API
│
├── routes/
│   ├── internal/           # Internal APIs
│   │   └── dataRoutes.js   # Data topic endpoints
│   │
│   ├── debugRoutes.js      # (Future) Dev-facing /debug
│   └── statusRoutes.js     # (Future) /status API
│
├── jobs/
│   ├── syncSubscriptions.js # 5-min sync
│   └── messageQueue.js      # (Future) Async processing
│
├── utils/
│   ├── validation.js       # Data validators
│   ├── logger.js           # Custom logging
│   └── websocket.js        # (Future) WS setup
|
├── .env
├── app.js
├── package.json
└── README.md

```
