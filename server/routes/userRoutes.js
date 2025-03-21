const express = require("express");
const router = express.Router();
const {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { validateInput } = require("../middlewares/validationMiddleware");
const { usserSchema } = require("../validations/userValidation");

router.use(isAuthenticated);

router.get("/", fetchUsers);
router.post("/", validateInput(usserSchema), addUser);
router.put("/:id", validateInput(usserSchema), editUser);
router.delete("/:id", deleteUser);

module.exports = router;
