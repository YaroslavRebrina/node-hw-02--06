const JWT = require("jsonwebtoken");
const { errorHandler } = require("../heplers");
const User = require("../schemas/user");

const { HASH_SECRET_KEY } = process.env;
const isAuthorized = async (req, _, next) => {
  const { authorization } = req.headers;
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw errorHandler(401);
  }

  try {
    const tokenIsVerified = JWT.verify(token, HASH_SECRET_KEY);

    const user = await User.findById(tokenIsVerified.id);

    if (!user) {
      throw errorHandler(401);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.message === "invalid token" || err.message === "jwt expired") {
      next(errorHandler(401));
    }
    next(err);
  }
};

module.exports = isAuthorized;
