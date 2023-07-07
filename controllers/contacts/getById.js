const { errorHandler } = require("../../heplers");
const Contact = require("../../schemas/contact");


const getByID = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  console.log(result);
  if (!result) {
    throw errorHandler(404);
  }
  res.json(result);
};

module.exports = getByID