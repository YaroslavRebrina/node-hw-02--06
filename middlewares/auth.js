const JWT = require("jsonwebtoken");
const { errorHandler } = require("../heplers");
const User = require("../schemas/user");

const { HASH_SECRET_KEY } = process.env;
const isAuthorized = async (req, res, next) => {
  const { authorization } = req.headers;
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw errorHandler(401);
  }

  try {
    const tokenIsVerified = JWT.verify(token, HASH_SECRET_KEY);

    if (!tokenIsVerified) {
      throw errorHandler(401);
    }

    const user = await User.findById(tokenIsVerified.id);

    if (!user) {
      throw errorHandler(401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuthorized;
