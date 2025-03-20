const { sendError } = require("../utils/responseUtils");

const validateInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return sendError(res, 400, errorMessage);
    }
    next();
  };
};

module.exports = { validateInput };
