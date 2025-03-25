const express = require("express");
const router = express.Router();
const {
  fetchGateways,
  addGateway,
  editGateway,
  deleteGateway,
} = require("../controllers/gatewayController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { checkGatewayLimit } = require("../middlewares/subscriptionMiddleware");
const {
  gatewaySchema,
  deleteGatewaySchema,
} = require("../schemas/gatewayValidation");

router.use(isAuthenticated);

router.get("/", fetchGateways);
router.post(
  "/",
  validationMiddleware(gatewaySchema),
  checkGatewayLimit,
  addGateway
);
router.put("/:gateway_id", validationMiddleware(gatewaySchema), editGateway);
router.delete("/", validationMiddleware(deleteGatewaySchema), deleteGateway);

module.exports = router;
