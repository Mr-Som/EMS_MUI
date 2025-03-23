const Joi = require("joi");

const gatewaySchema = Joi.object({
  mac_address: Joi.string()
    .pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)
    .required()
    .messages({
      "string.pattern.base":
        "MAC address must be in format XX:XX:XX:XX:XX:XX or XX-XX-XX-XX-XX-XX",
      "any.required": "MAC address is required",
    }),
  serial_number: Joi.string().max(50).required().messages({
    "string.max": "Serial number must be 50 characters or less",
    "any.required": "Serial number is required",
  }),
  nick_name: Joi.string().max(100).optional().allow("").messages({
    "string.max": "Nick name must be 100 characters or less",
  }),
  project_name: Joi.string().max(100).optional().allow("").messages({
    "string.max": "Project name must be 100 characters or less",
  }),
  location: Joi.string().max(255).optional().allow("").messages({
    "string.max": "Location must be 255 characters or less",
  }),
  network_mode: Joi.string().required().messages({
    "any.required": "Network mode is required",
  }),
  ssid_1: Joi.string().max(50).optional().allow("").messages({
    "string.max": "SSID 1 must be 50 characters or less",
  }),
  ssid_pwd_1: Joi.string().max(100).optional().allow("").messages({
    "string.max": "SSID password 1 must be 100 characters or less",
  }),
  ssid_2: Joi.string().max(50).optional().allow("").messages({
    "string.max": "SSID 2 must be 50 characters or less",
  }),
  ssid_pwd_2: Joi.string().max(100).optional().allow("").messages({
    "string.max": "SSID password 2 must be 100 characters or less",
  }),
  ssid_timeout: Joi.number().integer().optional().allow(null),
  apn_name: Joi.string().max(100).optional().allow("").messages({
    "string.max": "APN name must be 100 characters or less",
  }),
  md_protocol: Joi.string().max(50).optional().allow("").messages({
    "string.max": "Modbus protocol must be 50 characters or less",
  }),
  baud_rate: Joi.number()
    .integer()
    .min(300)
    .max(115200)
    .optional()
    .allow(null)
    .messages({
      "number.min": "Baud rate must be at least 300",
      "number.max": "Baud rate must not exceed 115200",
    }),
  data_bits: Joi.number()
    .integer()
    .min(5)
    .max(8)
    .optional()
    .allow(null)
    .messages({
      "number.min": "Data bits must be at least 5",
      "number.max": "Data bits must not exceed 8",
    }),
  stop_bits: Joi.number()
    .integer()
    .min(1)
    .max(2)
    .optional()
    .allow(null)
    .messages({
      "number.min": "Stop bits must be at least 1",
      "number.max": "Stop bits must not exceed 2",
    }),
  parity: Joi.string()
    .valid("none", "even", "odd")
    .optional()
    .allow("")
    .messages({
      "any.only": "Parity must be one of 'none', 'even', or 'odd'",
    }),
});

// Validation schema for deleting gateways (bulk delete)
const deleteGatewaySchema = Joi.object({
  gateway_ids: Joi.array()
    .items(Joi.string().uuid().required())
    .min(1)
    .required()
    .messages({
      "array.min": "At least one gateway ID is required",
      "any.required": "gateway_ids is required",
      "string.uuid": "Each gateway ID must be a valid UUID",
    }),
});

module.exports = { gatewaySchema, deleteGatewaySchema };
