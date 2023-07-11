const { errorHandler } = require("../../heplers");
const User = require("../../schemas/user");

const logout = async (req, res, next) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, { token: "" });

  if (!result) {
    console.log(_id);
    throw errorHandler(404);
  }

  res.status(204).json();
};

module.exports = logout;
