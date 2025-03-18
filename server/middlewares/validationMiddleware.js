const { sendError } = require("../utils/responseUtils");

const validateInput = (validationFunction) => {
  return (req, res, next) => {
    const { error } = validationFunction(req.body);
    if (error) {
      return sendError(res, 400, error.details[0].message);
    }
    next();
  };
};

module.exports = { validateInput };
