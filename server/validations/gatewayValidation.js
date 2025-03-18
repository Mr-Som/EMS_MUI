const Joi = require("joi");

const gatewaySchema = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().max(1000).optional(),
  });
  return schema.validate(data);
};

module.exports = { gatewaySchema };
