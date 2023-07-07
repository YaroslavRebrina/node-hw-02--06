const { errorHandler } = require("../../heplers");
const Contact = require("../../schemas/contact");

const updateStatusContact = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!body || !body.favorite) {
    throw errorHandler(400);
  } else if (!result) {
    throw errorHandler(404);
  }
  res.json(result);
};

module.exports = updateStatusContact;
