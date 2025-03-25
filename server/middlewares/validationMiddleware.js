// validationMiddleware.js
const Joi = require("joi");

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    next();
  };
};

module.exports = { validationMiddleware };
