const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/authController");
const { validateInput } = require("../middlewares/validationMiddleware");
const { signupSchema, loginSchema } = require("../validations/authValidation");
const { sendSuccess, sendError } = require("../utils/responseUtils"); // Import for consistent response

// Signup route
router.post("/signup", validateInput(signupSchema), signup);

// Login route
router.post("/login", validateInput(loginSchema), login);

// Logout route
router.post("/logout", logout);

// Check session route
router.get("/check-session", (req, res) => {
  if (req.session.user) {
    sendSuccess(res, { user: req.session.user }, "Session active");
  } else {
    sendError(res, 401, "No active session");
  }
});

module.exports = router;
