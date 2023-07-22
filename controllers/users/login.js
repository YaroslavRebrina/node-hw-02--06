const { errorHandler } = require("../../heplers");
const User = require("../../schemas/user");
const brypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { HASH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email: email });

  if (!userExist) {
    throw errorHandler(401);
  }

  if (userExist.verified === false) {
    throw errorHandler(401);
  }

  const passwordIsValid = await brypt.compare(password, userExist.password);

  if (!passwordIsValid) {
    throw errorHandler(401);
  }

  const payload = {
    id: userExist._id,
  };

  const JWT_TOKEN = JWT.sign(payload, HASH_SECRET_KEY, {
    expiresIn: "1h",
  });

  await User.findByIdAndUpdate(
    userExist._id,
    { token: JWT_TOKEN },
    { new: true }
  );

  res.status(200).json({
    token: JWT_TOKEN,
    user: {
      email: userExist.email,
      subscription: userExist.subscription,
    },
  });
};

module.exports = login;
