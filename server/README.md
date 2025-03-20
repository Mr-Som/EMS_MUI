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

project/
│
├── config/ # Configuration files
│ ├── db.js # PostgreSQL connection setup
│ ├── session.js # Session management configuration
│ └── mqtt.js # MQTT client configuration and connection setup
│
├── controllers/ # Business logic for endpoints
│ ├── authController.js # Handles login, signup, and logout
│ ├── gatewayController.js # Handles gateway operations (fetch, add, edit, delete)
│ └── mqttController.js # Handles MQTT message processing and data storage
│
├── middlewares/ # Middleware for handling requests
│ ├── authMiddleware.js # Middleware to check session validity
│ ├── validationMiddleware.js # Middleware for input validation
│ └── subscriptionMiddleware.js # Verifies gateway subscription validity
│
├── models/ # Database models
│ ├── User.js # User model for PostgreSQL
│ ├── Gateway.js # Gateway model for PostgreSQL
│ └── MqttData.js # Model for storing MQTT data in PostgreSQL
│
├── mqtt/ # MQTT-specific files
│ ├── mqttHandler.js # Handles incoming MQTT messages
│ └── topics.js # Defines MQTT topics to subscribe to
│
├── routes/ # Route definitions
│ ├── authRoutes.js # Routes for authentication (login, signup, logout)
│ ├── gatewayRoutes.js # Routes for gateway management (fetch, add, edit, delete)
│ └── mqttRoutes.js # Routes for managing or monitoring MQTT topics
│
├── utils/ # Utility functions
│ ├── hashUtils.js # For password hashing and validation
│ ├── responseUtils.js # Standardized API responses
│ └── mqttUtils.js # Utilities for MQTT message processing
│
├── validations/ # Validation logic for requests
│ ├── authValidation.js # Validation for login and signup input
│ └── gatewayValidation.js # Validation for gateway operations
│
├── .env # Environment variables (e.g., MQTT broker URL, database URL, session secret)
├── package.json # Node.js dependencies and scripts
├── index.js # Entry point of the application
└── README.md # Project documentation

project/ ├── config/ │ ├── db.js - PostgreSQL connection setup │ ├── session.js - Session management configuration │ └── mqtt.js - MQTT client configuration and connection setup ├── controllers/ │ ├── authController.js - Handles login, signup, and logout │ ├── gatewayController.js - Handles gateway operations (fetch, add, edit, delete) │ └── mqttController.js - Handles MQTT message processing and data storage ├── middlewares/ │ ├── authMiddleware.js - Middleware to check session validity │ ├── validationMiddleware.js - Middleware for input validation │ └── subscriptionMiddleware.js - Verifies gateway subscription validity ├── models/ │ ├── User.js - User model for PostgreSQL │ ├── Gateway.js - Gateway model for PostgreSQL │ └── MqttData.js - Model for storing MQTT data in PostgreSQL ├── mqtt/ │ ├── mqttHandler.js - Handles incoming MQTT messages │ └── topics.js - Defines MQTT topics to subscribe to ├── routes/ │ ├── authRoutes.js - Routes for authentication (login, signup, logout) │ ├── gatewayRoutes.js - Routes for gateway management (fetch, add, edit, delete) │ └── mqttRoutes.js - Routes for managing or monitoring MQTT topics ├── utils/ │ ├── hashUtils.js - For password hashing and validation │ ├── responseUtils.js - Standardized API responses │ └── mqttUtils.js - Utilities for MQTT message processing ├── validations/ │ ├── authValidation.js - Validation for login and signup input │ └── gatewayValidation.js - Validation for gateway operations ├── .env - Environment variables (e.g., MQTT broker URL, database URL, session secret) ├── package.json - Node.js dependencies and scripts ├── index.js - Entry point of the application └── README.md - Project documentation
