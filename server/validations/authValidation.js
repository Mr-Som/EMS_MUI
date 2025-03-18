const Joi = require("joi");

const signupSchema = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginSchema = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { signupSchema, loginSchema };
