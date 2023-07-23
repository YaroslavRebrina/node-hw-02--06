const Joi = require("joi");

const verifySchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "Email is required" }),
});

module.exports = verifySchema;
