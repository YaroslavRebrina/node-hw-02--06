const { errorHandler } = require("../../heplers");
const User = require("../../schemas/user");

const verification = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const result = await User.findOneAndUpdate(
      { verificationToken: verificationToken },
      { verificationToken: null, verified: true }
    );

    if (!result) {
      throw errorHandler(404);
    }

    res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    next(err);
  }
};

module.exports = verification;
