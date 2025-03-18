const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/authController");
const { validateInput } = require("../middlewares/validationMiddleware");
const { signupSchema, loginSchema } = require("../validations/authValidation");

router.post("/signup", validateInput(signupSchema), signup);
router.post("/login", validateInput(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
