const contactSchema = require("./contacts");
const userSchema = require("./users/index");
const validateScheme = require("./validateScheme");
const isAuthorized = require("./auth");
module.exports = { contactSchema, userSchema, validateScheme, isAuthorized };
