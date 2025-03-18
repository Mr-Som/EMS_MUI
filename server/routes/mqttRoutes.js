const express = require("express");
const router = express.Router();
const {
  getMqttData,
  publishMessage,
} = require("../controllers/mqttController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.use(isAuthenticated); // All routes require authentication

router.get("/data", getMqttData);
router.post("/publish", publishMessage);

module.exports = router;
