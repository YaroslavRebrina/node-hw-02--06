const Contact = require("../../schemas/contact");

const createNewContact = async (req, res, next) => {
  const body = { ...req.body, owner: req.user._id };
  await Contact.create(body);
  res.status(201).json(body);
};

module.exports = createNewContact;
