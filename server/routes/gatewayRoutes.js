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
const { gatewaySchema } = require("../validations/gatewayValidation");

router.use(isAuthenticated); // All routes require authentication

router.get("/", fetchGateways);
router.post("/", validateInput(gatewaySchema), addGateway);
router.put("/:id", validateInput(gatewaySchema), editGateway);
router.delete("/:id", deleteGateway);

module.exports = router;
