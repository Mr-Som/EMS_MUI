// authRoutes.js
const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/authController");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { signupSchema, loginSchema } = require("../schemas/authValidation");
const { sendSuccess, sendError } = require("../utils/responseUtils");

router.post("/signup", validationMiddleware(signupSchema), signup);
router.post("/login", validationMiddleware(loginSchema), login);
router.post("/logout", logout);
router.get("/check-session", (req, res) => {
  if (req.session.user) {
    sendSuccess(res, { user: req.session.user }, "Session active");
  } else {
    sendError(res, 401, "No active session");
  }
});

module.exports = router;
