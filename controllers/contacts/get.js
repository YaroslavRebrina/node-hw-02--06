const { errorHandler } = require("../../heplers");
const Contact = require("../../schemas/contact");

const get = async (req, res, next) => {
  const { _id } = req.user;

  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: _id, favorite: favorite })
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw errorHandler(404);
  }
  res.json(result);
};

module.exports = get;
