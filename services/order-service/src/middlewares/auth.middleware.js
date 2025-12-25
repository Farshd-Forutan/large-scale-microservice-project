const jwt = require("jsonwebtoken");
const config = require("../config");
const ApiError = require("../utils/apiError");

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(401, "Not authorized to access this route"));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ApiError(401, "Token is invalid or expired"));
  }
};

module.exports = protect;
