const express = require("express");
const router = express.Router();
const {
  fetchGateways,
  addGateway,
  editGateway,
  deleteGateway,
} = require("../controllers/gatewayController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { validateInput } = require("../middlewares/validationMiddleware");
const checkSubscriptionLimit = require("../middlewares/subscriptionMiddleware");
const {
  gatewaySchema,
  deleteGatewaySchema,
} = require("../validations/gatewayValidation");

router.use(isAuthenticated);

router.get("/", fetchGateways);
router.post(
  "/",
  validateInput(gatewaySchema),
  checkSubscriptionLimit,
  addGateway
);
router.put("/:gateway_id", validateInput(gatewaySchema), editGateway);
router.delete("/", validateInput(deleteGatewaySchema), deleteGateway);

module.exports = router;
