# MQTT Gateway Management System

A Node.js application for managing gateways, handling MQTT messages, and user authentication with PostgreSQL.

## Prerequisites

- Node.js
- PostgreSQL (configured via Aiven or local instance)
- MQTT Broker

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Configure `.env` with your credentials (see `.env` example).
4. Start the server: `npm start`.

## Environment Variables

- `PG_USER`, `PG_PASSWORD`, `PG_HOST`, `PG_PORT`, `PG_DATABASE`, `PG_SSL_CERT`
- `MQTT_BROKER_URL`, `MQTT_PORT`, `MQTT_USERNAME`, `MQTT_PASSWORD`
- `SESSION_SECRET`, `PORT`

## Directory Structure

- `config/`: Configuration files
- `controllers/`: Business logic
- `middlewares/`: Request handling middleware
- `models/`: Database models
- `mqtt/`: MQTT-specific logic
- `routes/`: API route definitions
- `utils/`: Utility functions
- `validations/`: Input validation logic
