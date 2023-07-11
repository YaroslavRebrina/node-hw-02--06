const { errorHandler } = require("../../heplers");
const User = require("../../schemas/user");
const brypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const hashedPassword = await brypt.hash(password, 10);

  try {
    const result = await User.create({
      password: hashedPassword,
      email,
      subscription,
      token: "",
    });

    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      throw errorHandler(409);
    } else if (err) {
      console.log(err);
      throw errorHandler(400);
    }
  }
};

module.exports = register;
