const { errorHandler, verificationEmailer } = require("../../heplers");
const User = require("../../schemas/user");
const brypt = require("bcrypt");
const gravatar = require("gravatar");

const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const hashedPassword = await brypt.hash(password, 10);
  const avatarURL = gravatar.profile_url(email);
  const verificationToken = nanoid();

  verificationEmailer({ email: email, verificationToken: verificationToken });

  try {
    const result = await User.create({
      password: hashedPassword,
      email,
      subscription,
      avatarURL: avatarURL,
      token: "",
      verified: false,
      verificationToken: verificationToken,
    });

    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
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
