const { errorHandler } = require("../../heplers");
const verificationEmailer = require("../../heplers/verifiactionEmailer");
const User = require("../../schemas/user");

const verificationResending = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email, verified: false });

    if (!user) {
      throw errorHandler(400);
    }

    verificationEmailer({
      email: email,
      verificationToken: user.verificationToken,
    });

    res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    next(err);
  }
};

module.exports = verificationResending;
