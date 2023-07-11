const { errorHandler } = require("../../heplers");
const Contact = require("../../schemas/contact");

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw errorHandler(404);
  }
  res.json(result);
};

module.exports = deleteContact;
