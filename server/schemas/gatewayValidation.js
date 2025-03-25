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
  nick_name: Joi.string().max(100).required().messages({
    "string.max": "Nick name must be 100 characters or less",
    "any.required": "Nick name is required",
  }),
  project_name: Joi.string().max(100).required().messages({
    "string.max": "Project name must be 100 characters or less",
    "any.required": "Project name is required",
  }),
  location: Joi.string().max(255).required().messages({
    "string.max": "Location must be 255 characters or less",
    "any.required": "Location is required",
  }),
  meter_count: Joi.number().integer().min(0).required().messages({
    "number.min": "Meter count must be at least 0",
    "any.required": "Meter count is required",
  }),
  network_mode: Joi.string().valid("GSM", "WiFi", "Both").required().messages({
    "any.required": "Network mode is required",
    "any.only": "Network mode must be one of 'GSM', 'WiFi', or 'Both'",
  }),
  ssid_1: Joi.string()
    .max(50)
    .when("network_mode", {
      is: Joi.string().valid("WiFi", "Both"),
      then: Joi.string().required(),
      otherwise: Joi.string().allow("").optional(),
    })
    .messages({
      "string.max": "SSID 1 must be 50 characters or less",
      "any.required": "SSID 1 is required for WiFi or Both network modes",
    }),
  ssid_pwd_1: Joi.string()
    .max(100)
    .when("network_mode", {
      is: Joi.string().valid("WiFi", "Both"),
      then: Joi.string().required(),
      otherwise: Joi.string().allow("").optional(),
    })
    .messages({
      "string.max": "SSID password 1 must be 100 characters or less",
      "any.required":
        "SSID password 1 is required for WiFi or Both network modes",
    }),
  ssid_2: Joi.string().max(50).optional().allow("").messages({
    "string.max": "SSID 2 must be 50 characters or less",
  }),
  ssid_pwd_2: Joi.string().max(100).optional().allow("").messages({
    "string.max": "SSID password 2 must be 100 characters or less",
  }),
  ssid_timeout: Joi.number()
    .integer()
    .when("network_mode", {
      is: Joi.string().valid("WiFi", "Both"),
      then: Joi.number().required(),
      otherwise: Joi.number().allow(null).optional(),
    })
    .messages({
      "any.required": "SSID timeout is required for WiFi or Both network modes",
    }),
  apn_name: Joi.string().max(100).optional().allow("").messages({
    "string.max": "APN name must be 100 characters or less",
  }),
  md_protocol: Joi.string()
    .valid("Modbus RTU", "Modbus TCP", "Modbus ASCII")
    .required()
    .messages({
      "any.required": "Modbus protocol is required",
      "any.only":
        "Modbus protocol must be one of 'Modbus RTU', 'Modbus TCP', or 'Modbus ASCII'",
    }),
  baud_rate: Joi.number().integer().min(300).max(115200).required().messages({
    "number.min": "Baud rate must be at least 300",
    "number.max": "Baud rate must not exceed 115200",
    "any.required": "Baud rate is required",
  }),
  data_bits: Joi.number().integer().min(5).max(8).required().messages({
    "number.min": "Data bits must be at least 5",
    "number.max": "Data bits must not exceed 8",
    "any.required": "Data bits is required",
  }),
  stop_bits: Joi.number().integer().min(1).max(2).required().messages({
    "number.min": "Stop bits must be at least 1",
    "number.max": "Stop bits must not exceed 2",
    "any.required": "Stop bits is required",
  }),
  parity: Joi.string().valid("none", "even", "odd").required().messages({
    "any.required": "Parity is required",
    "any.only": "Parity must be one of 'none', 'even', or 'odd'",
  }),
});

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
