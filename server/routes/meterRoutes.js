const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  fetchMeters,
  addMeter,
  editMeter,
  deleteMeter,
} = require("../controllers/meterController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { checkMeterLimit } = require("../middlewares/subscriptionMiddleware");
const {
  meterSchema,
  deleteMeterSchema,
} = require("../schemas/meterValidation");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/meters/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only PNG, JPG, and JPEG files are allowed"));
  },
});

router.use(isAuthenticated);

router.get("/", fetchMeters);
router.post(
  "/",
  upload.single("thumbnail"),
  validationMiddleware(meterSchema),
  checkMeterLimit,
  addMeter
);
router.put(
  "/:meter_id",
  upload.single("thumbnail"),
  validationMiddleware(meterSchema),
  editMeter
);
router.delete("/", validationMiddleware(deleteMeterSchema), deleteMeter);

module.exports = router;
