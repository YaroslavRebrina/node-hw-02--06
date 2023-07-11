const { errorHandler } = require("../../heplers");
const User = require("../../schemas/user");

const subscriptionUpdate = async (req, res, next) => {
  const { _id } = req.user;
  const subscriptionType = req.body.subscription;

  try {
    const { email, subscription } = await User.findByIdAndUpdate(
      _id,
      { subscription: subscriptionType },
      { new: true, runValidators: true }
    );

    if (!email) {
      throw errorHandler(404);
    }

    res.json({ email, subscription });
  } catch (err) {
    next(err);
  }
};

module.exports = subscriptionUpdate;
