const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/responseUtils");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Multer configuration for file uploads
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

// Fetch all meters for a user's subscription (excluding thumbnail_path)
const fetchMeters = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        m.meter_id,
        m.uid,
        m.serial_number,
        m.model_name,
        m.nick_name,
        m.location,
        m.md_protocol,
        m.md_id,
        m.ct_primary,
        m.ct_secondary,
        m.pt_primary,
        m.pt_secondary,
        m.voltage_mf,
        m.current_mf,
        m.energy_mf,
        m.phase_type,
        m.load_type,
        m.contract_kw,
        m.online,
        m.last_seen,
        m.gateway_id,
        m.subscription_id,
        m.created_at,
        m.modified_at
      FROM meters m
      JOIN users u ON m.subscription_id = u.subscription_id
      WHERE u.user_id = $1
      `,
      [req.session.user.id]
    );

    sendSuccess(res, result.rows, "Meters fetched successfully");
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to fetch meters");
  }
};

// Add a new meter with thumbnail upload
const addMeter = async (req, res) => {
  console.log("Received body:", req.body); // Debug log
  console.log("Received file:", req.file); // Debug log

  const {
    gateway_id,
    serial_number,
    model_name,
    nick_name,
    location,
    md_protocol,
    md_id,
    ct_primary,
    ct_secondary,
    pt_primary,
    pt_secondary,
    voltage_mf,
    current_mf,
    energy_mf,
    phase_type,
    load_type,
    contract_kw,
  } = req.body;

  const thumbnailPath = req.file
    ? `/uploads/meters/${req.file.filename}`
    : null;

  try {
    // Get the user's subscription_id
    const userResult = await pool.query(
      "SELECT subscription_id FROM users WHERE user_id = $1",
      [req.session.user.id]
    );
    if (userResult.rows.length === 0) {
      return sendError(res, 404, "User not found");
    }
    const subscription_id = userResult.rows[0].subscription_id;

    // Verify the gateway belongs to the user's subscription
    const gatewayCheck = await pool.query(
      `
        SELECT gateway_id
        FROM gateways
        WHERE gateway_id = $1 AND subscription_id = $2
        `,
      [gateway_id, subscription_id]
    );
    if (gatewayCheck.rows.length === 0) {
      return sendError(res, 404, "Gateway not found or not authorized");
    }

    const result = await pool.query(
      `
        INSERT INTO meters (
          gateway_id,
          serial_number,
          model_name,
          nick_name,
          location,
          md_protocol,
          md_id,
          ct_primary,
          ct_secondary,
          pt_primary,
          pt_secondary,
          voltage_mf,
          current_mf,
          energy_mf,
          phase_type,
          load_type,
          contract_kw,
          subscription_id,
          thumbnail_path
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING *
        `,
      [
        gateway_id,
        serial_number,
        model_name,
        nick_name,
        location,
        md_protocol,
        md_id,
        ct_primary,
        ct_secondary,
        pt_primary,
        pt_secondary,
        voltage_mf,
        current_mf,
        energy_mf,
        phase_type,
        load_type,
        contract_kw,
        subscription_id,
        thumbnailPath,
      ]
    );

    sendSuccess(res, result.rows[0], "Meter added successfully");
  } catch (err) {
    console.error(err);
    sendError(res, 400, "Failed to add meter");
  }
};

// Edit an existing meter (with thumbnail update)
const editMeter = async (req, res) => {
  const { meter_id } = req.params;
  const {
    serial_number,
    model_name,
    nick_name,
    location,
    md_protocol,
    md_id,
    ct_primary,
    ct_secondary,
    pt_primary,
    pt_secondary,
    voltage_mf,
    current_mf,
    energy_mf,
    phase_type,
    load_type,
    contract_kw,
    online,
    last_seen,
  } = req.body;

  try {
    // Fetch existing thumbnail_path to delete old file if updated
    const existingMeter = await pool.query(
      "SELECT thumbnail_path FROM meters WHERE meter_id = $1",
      [meter_id]
    );
    const oldThumbnailPath = existingMeter.rows[0]?.thumbnail_path;

    const thumbnailPath = req.file
      ? `/uploads/meters/${req.file.filename}`
      : oldThumbnailPath;

    const result = await pool.query(
      `
        UPDATE meters
        SET
          serial_number = COALESCE($1, serial_number),
          model_name = COALESCE($2, model_name),
          nick_name = COALESCE($3, nick_name),
          location = COALESCE($4, location),
          md_protocol = COALESCE($5, md_protocol),
          md_id = COALESCE($6, md_id),
          ct_primary = COALESCE($7, ct_primary),
          ct_secondary = COALESCE($8, ct_secondary),
          pt_primary = COALESCE($9, pt_primary),
          pt_secondary = COALESCE($10, pt_secondary),
          voltage_mf = COALESCE($11, voltage_mf),
          current_mf = COALESCE($12, current_mf),
          energy_mf = COALESCE($13, energy_mf),
          phase_type = COALESCE($14, phase_type),
          load_type = COALESCE($15, load_type),
          contract_kw = COALESCE($16, contract_kw),
          online = COALESCE($17, online),
          last_seen = COALESCE($18, last_seen),
          thumbnail_path = COALESCE($19, thumbnail_path),
          modified_at = CURRENT_TIMESTAMP
        WHERE meter_id = $20 AND subscription_id IN (
          SELECT subscription_id FROM users WHERE user_id = $21
        )
        RETURNING *
        `,
      [
        serial_number,
        model_name,
        nick_name,
        location,
        md_protocol,
        md_id,
        ct_primary,
        ct_secondary,
        pt_primary,
        pt_secondary,
        voltage_mf,
        current_mf,
        energy_mf,
        phase_type,
        load_type,
        contract_kw,
        online,
        last_seen,
        thumbnailPath,
        meter_id,
        req.session.user.id,
      ]
    );

    if (result.rowCount === 0) {
      return sendError(res, 404, "Meter not found or not authorized");
    }

    // Delete old thumbnail if a new one was uploaded
    if (req.file && oldThumbnailPath) {
      try {
        await fs.unlink(path.join(__dirname, "..", oldThumbnailPath));
      } catch (unlinkErr) {
        console.error("Failed to delete old thumbnail:", unlinkErr);
      }
    }

    sendSuccess(res, result.rows[0], "Meter updated successfully");
  } catch (err) {
    console.error(err);
    sendError(res, 400, "Failed to update meter");
  }
};

// Delete one or more meters (with thumbnail cleanup)
const deleteMeter = async (req, res) => {
  const { meter_ids } = req.body;

  try {
    // Fetch thumbnail paths before deletion
    const thumbnails = await pool.query(
      "SELECT thumbnail_path FROM meters WHERE meter_id = ANY($1)",
      [meter_ids]
    );

    const result = await pool.query(
      `
      DELETE FROM meters
      WHERE meter_id = ANY($1) AND subscription_id IN (
        SELECT subscription_id FROM users WHERE user_id = $2
      )
      RETURNING meter_id
      `,
      [meter_ids, req.session.user.id]
    );

    if (result.rowCount === 0) {
      return sendError(res, 404, "No meters found or not authorized");
    }

    // Delete associated thumbnails from filesystem
    for (const row of thumbnails.rows) {
      if (row.thumbnail_path) {
        try {
          await fs.unlink(path.join(__dirname, "..", row.thumbnail_path));
        } catch (unlinkErr) {
          console.error("Failed to delete thumbnail:", unlinkErr);
        }
      }
    }

    sendSuccess(
      res,
      { deleted: result.rows.map((row) => row.meter_id) },
      "Meters deleted successfully"
    );
  } catch (err) {
    console.error(err);
    sendError(res, 500, "Failed to delete meters");
  }
};

module.exports = {
  fetchMeters,
  addMeter,
  editMeter,
  deleteMeter,
};
