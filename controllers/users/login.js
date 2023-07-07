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

  const passportIsValid = await brypt.compare(password, userExist.password);

  if (!passportIsValid) {
    throw errorHandler(401);
    }
    
  const payload = {
    id: userExist._id,
    };
    
  const JWT_TOKEN = JWT.sign(payload, HASH_SECRET_KEY, {
    expiresIn: "1h",
  });

  console.log(JWT_TOKEN);
  const result = await User.findByIdAndUpdate(
    userExist._id,
    { token: JWT_TOKEN },
    { new: true }
  );

  res.status(200).json(result);
};

module.exports = login;
