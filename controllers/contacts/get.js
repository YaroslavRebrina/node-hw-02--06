const { errorHandler } = require("../../heplers");
const Contact = require("../../schemas/contact");

const get = async (req, res, next) => {
  const result = await Contact.find();
  if (!result) {
    throw errorHandler(404);
  }
  res.json(result);
};

module.exports = get