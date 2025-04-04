// schemas/meterValidation.js (or wherever meterSchema is defined)
const Joi = require("joi");

const meterSchema = Joi.object({
  gateway_id: Joi.string().uuid().required(),
  mac_address: Joi.string().max(255).required(),
  serial_number: Joi.string().max(100).required(),
  model_name: Joi.string().max(50).required(),
  nick_name: Joi.string().max(255).optional().allow(""),
  location: Joi.string().max(255).optional().allow(""),
  md_protocol: Joi.string().max(100).optional().allow(""),
  md_id: Joi.number().integer().required(),
  ct_primary: Joi.number().integer().optional().allow(null),
  ct_secondary: Joi.number().integer().optional().allow(null),
  pt_primary: Joi.number().integer().optional().allow(null),
  pt_secondary: Joi.number().integer().optional().allow(null),
  voltage_mf: Joi.number().integer().optional().allow(null),
  current_mf: Joi.number().integer().optional().allow(null),
  energy_mf: Joi.number().integer().optional().allow(null),
  phase_type: Joi.string().max(10).optional().allow(""),
  load_type: Joi.string().max(10).optional().allow(""),
  contract_kw: Joi.number().integer().optional().allow(null),
  online: Joi.boolean().optional(),
  last_seen: Joi.date().optional().allow(null),
});

const deleteMeterSchema = Joi.object({
  meter_ids: Joi.array()
    .items(Joi.string().uuid().required())
    .min(1)
    .required(),
});

module.exports = { meterSchema, deleteMeterSchema };
