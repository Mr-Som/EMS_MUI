const { sendError } = require("../utils/responseUtils");

const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return sendError(res, 401, "Unauthorized: Please log in");
  }
  next();
};

module.exports = { isAuthenticated };
