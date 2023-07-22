const contactSchema = require("./contacts");
const userSchema = require("./users/index");
const validateScheme = require("./validateScheme");
const isAuthorized = require("./auth");
const idValidator = require("./idValidator");
const upload = require("./upload");

module.exports = {
  contactSchema,
  userSchema,
  validateScheme,
  isAuthorized,
  idValidator,
  upload,
};
