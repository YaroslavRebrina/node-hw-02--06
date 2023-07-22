const contactSchema = require("./contacts");
const userSchema = require("./users/index");
const validateScheme = require("./validateScheme");
const isAuthorized = require("./auth");
const idValidator = require("./idValidator");
const upload = require("./upload");
const verifySchema = require("./verify");

module.exports = {
  contactSchema,
  userSchema,
  validateScheme,
  isAuthorized,
  idValidator,
  upload,
  verifySchema,
};
