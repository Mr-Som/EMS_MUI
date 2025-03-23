# MQTT Gateway Management System

A Node.js application for managing gateways, handling MQTT messages, and user authentication with PostgreSQL.

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
server/
│
├── config/
│ ├── db.js
│ ├── session.js
│ └── mqtt.js
│
├── controllers/
│ ├── authController.js
│ ├── gatewayController.js
│ ├── mqttController.js
│ └── userController.js
│
├── middlewares/
│ ├── authMiddleware.js
│ ├── validationMiddleware.js
│ └── subscriptionMiddleware.js
│
├── models/
│ ├── User.js
│ ├── Gateway.js
│ └── MqttData.js
│
├── mqtt/
│ ├── mqttHandler.js
│ └── topics.js
│
├── routes/
│ ├── authRoutes.js
│ ├── gatewayRoutes.js
│ └── mqttRoutes.js
│
├── utils/
│ ├── hashUtils.js
│ ├── responseUtils.js
│ └── mqttUtils.js
│
├── validations/
│ ├── authValidation.js
│ └── gatewayValidation.js
│ └── userValidation.js
│
├── .env
├── package.json
├── index.js
└── README.md

```

## File Descriptions and Use Cases

### `config/`

- **`db.js`**

  - **Purpose**: Creates a PostgreSQL connection pool using `pg`.
  - **Used In**: All controllers (`authController.js`, `gatewayController.js`, etc.) and middlewares (`subscriptionMiddleware.js`) that query the database.
  - **Why**: Centralizes database access for reusability.

- **`session.js`**

  - **Purpose**: Configures `express-session` with `connect-pg-simple` to store sessions in PostgreSQL.
  - **Used In**: `index.js` to initialize session middleware.
  - **Why**: Persists user login state across requests (e.g., `req.session.user`).

- **`mqtt.js`**
  - **Purpose**: Sets up the MQTT client connection to the broker.
  - **Used In**: `mqttHandler.js` for publishing/subscribing.
  - **Why**: Enables real-time communication with gateways.

### `controllers/`

- **`authController.js`**

  - **Purpose**: Handles login, logout, and authentication logic.
  - **Used In**: `authRoutes.js` endpoints (e.g., `/api/login`).
  - **Why**: Manages user sessions and access.

- **`gatewayController.js`**

  - **Purpose**: Implements CRUD for gateways (fetch, add, edit, delete).
  - **Used In**: `gatewayRoutes.js` endpoints (e.g., `/api/gateways`).
  - **Why**: Core logic for gateway management.

- **`mqttController.js`**

  - **Purpose**: Processes incoming MQTT messages and updates the database.
  - **Used In**: `mqttRoutes.js` or `mqttHandler.js`.
  - **Why**: Bridges MQTT data to the app.

- **`userController.js`**
  - **Purpose**: Manages user data (e.g., fetch all users).
  - **Used In**: `userRoutes.js` (assumed, not provided).
  - **Why**: Admin functionality for user oversight.

### `middlewares/`

- **`authMiddleware.js`**

  - **Purpose**: Checks if `req.session.user` exists (user is logged in).
  - **Used In**: All routes in `gatewayRoutes.js`, `authRoutes.js`, etc., via `router.use(isAuthenticated)`.
  - **Why**: Protects endpoints from unauthorized access. For example, in `gatewayRoutes.js`, it ensures only logged-in users can fetch or modify gateways.
  - **Use Case**: Before every gateway request (e.g., `GET /api/gateways`), it runs to verify authentication.

- **`validationMiddleware.js`**

  - **Purpose**: Validates `req.body` against a Joi schema.
  - **Used In**: Specific routes in `gatewayRoutes.js` (e.g., `POST /api/gateways`, `PUT /api/gateways/:gateway_id`) via `validateInput(schema)`.
  - **Why**: Ensures data integrity before processing. For example, in `addGateway`, it checks `mac_address` format before the controller runs.
  - **Use Case**: Applied to `POST` and `PUT` gateway routes to validate inputs like `mac_address` and `serial_number`.

- **`subscriptionMiddleware.js`**
  - **Purpose**: Checks if adding a gateway exceeds the subscription’s `gateway_count` limit.
  - **Used In**: `gatewayRoutes.js` for `POST /api/gateways` via `checkGatewayLimit`.
  - **Why**: Enforces subscription rules. For example, if a user’s plan allows 5 gateways and they have 5 already, it blocks adding more.
  - **Use Case**: Runs before `addGateway` to prevent over-allocation.

### `models/`

- **`User.js`**

  - **Purpose**: Encapsulates user-related database queries.
  - **Used In**: `authController.js`, `userController.js`.
  - **Why**: Separates DB logic from controllers.

- **`Gateway.js`**

  - **Purpose**: Encapsulates gateway-related database queries.
  - **Used In**: `gatewayController.js`.
  - **Why**: Keeps gateway logic modular.

- **`MqttData.js`**
  - **Purpose**: Handles MQTT data storage in the `em2m_data` table.
  - **Used In**: `mqttController.js`.
  - **Why**: Manages real-time data persistence.

### `mqtt/`

- **`mqttHandler.js`**

  - **Purpose**: Subscribes to MQTT topics and processes messages.
  - **Used In**: `mqttController.js` or directly in `index.js`.
  - **Why**: Core MQTT functionality.

- **`topics.js`**
  - **Purpose**: Defines MQTT topic strings.
  - **Used In**: `mqttHandler.js`.
  - **Why**: Centralizes topic management.

### `routes/`

- **`authRoutes.js`**

  - **Purpose**: Defines endpoints like `/api/login`, `/api/logout`.
  - **Used In**: `index.js` via `app.use("/api/auth", authRoutes)`.
  - **Why**: Organizes auth API routes.

- **`gatewayRoutes.js`**

  - **Purpose**: Defines endpoints for gateway management (e.g., `/api/gateways`).
  - **Used In**: `index.js` via `app.use("/api/gateways", gatewayRoutes)`.
  - **Why**: Structures gateway API endpoints.

- **`mqttRoutes.js`**
  - **Purpose**: Defines endpoints for MQTT interactions (e.g., publish messages).
  - **Used In**: `index.js` via `app.use("/api/mqtt", mqttRoutes)`.
  - **Why**: Exposes MQTT controls.

### `utils/`

- **`hashUtils.js`**

  - **Purpose**: Provides password hashing/verification.
  - **Used In**: `authController.js`.
  - **Why**: Secures user passwords.

- **`responseUtils.js`**

  - **Purpose**: Standardizes API responses (`sendSuccess`, `sendError`).
  - **Used In**: All controllers and middlewares.
  - **Why**: Consistent response format.

- **`mqttUtils.js`**
  - **Purpose**: Helper functions for MQTT operations.
  - **Used In**: `mqttHandler.js`, `mqttController.js`.
  - **Why**: Simplifies MQTT logic.

### `validations/`

- **`authValidation.js`**

  - **Purpose**: Validates login/register inputs.
  - **Used In**: `authRoutes.js` with `validationMiddleware.js`.
  - **Why**: Ensures valid auth data.

- **`gatewayValidation.js`**

  - **Purpose**: Validates gateway inputs (e.g., `mac_address`).
  - **Used In**: `gatewayRoutes.js` with `validationMiddleware.js`.
  - **Why**: Ensures gateway data meets schema requirements.

- **`userValidation.js`**
  - **Purpose**: Validates user inputs (e.g., email).
  - **Used In**: `userRoutes.js` (assumed) with `validationMiddleware.js`.
  - **Why**: Ensures valid user data.

### Root Files

- **`.env`**: Stores environment variables.
- **`package.json`**: Manages dependencies and scripts (e.g., `npm start`).
- **`index.js`**: Entry point, sets up Express, mounts routes, and starts the server.
- **`README.md`**: Documents the project (you’re reading it!).

## Why Middlewares Are Used and Where

### Why Use Middlewares?

Middlewares act like filters or checkpoints in the request-response cycle:

- **Authentication (`authMiddleware.js`)**: Ensures only logged-in users access protected resources.
- **Validation (`validationMiddleware.js`)**: Catches bad data early, reducing controller complexity.
- **Subscription Check (`subscriptionMiddleware.js`)**: Enforces business rules (e.g., subscription limits).

### Where They’re Used (Example Flow)

1. **Request**: `POST /api/gateways`

   - **`index.js`**: Routes to `gatewayRoutes.js`.
   - **`gatewayRoutes.js`**:
     - `router.use(isAuthenticated)`: Checks if user is logged in → If not, 401 error.
     - `validateInput(gatewaySchema)`: Validates `req.body` (e.g., `mac_address`) → If invalid, 400 error.
     - `checkGatewayLimit`: Checks subscription limit → If exceeded, 403 error.
     - `addGateway`: Executes if all middlewares pass.

2. **Request**: `PUT /api/gateways/:gateway_id`

   - **`isAuthenticated`**: Ensures login.
   - **`validateInput(gatewaySchema)`**: Validates update data.
   - **`editGateway`**: Updates the gateway if authorized.

3. **Request**: `DELETE /api/gateways`
   - **`isAuthenticated`**: Ensures login.
   - **`validateInput(deleteGatewaySchema)`**: Validates `gateway_ids` array.
   - **`deleteGateway`**: Deletes gateways if authorized.
