const express = require("express");
const router = express.Router();
const {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { usserSchema } = require("../schemas/userValidation");

router.use(isAuthenticated);

router.get("/", fetchUsers);
router.post("/", validationMiddleware(usserSchema), addUser);
router.put("/:id", validationMiddleware(usserSchema), editUser);
router.delete("/:id", deleteUser);

module.exports = router;
