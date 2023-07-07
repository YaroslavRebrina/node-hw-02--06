const { errorHandler } = require("../../heplers");
const Contact = require("../../schemas/contact");

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  console.log(body);
  if (!body) {
    throw errorHandler(400);
  }
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  res.json(result);
};

module.exports = updateContact