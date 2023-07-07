const express = require("express");

const { controllerWrapper } = require("../../heplers");
const { userSchema, validateScheme } = require("../../middlewares");

const { register, login } = require("../../controllers/users");

const router = express.Router();

router.post(
  "/register",
  validateScheme(userSchema),
  controllerWrapper(register)
);

router.post("/login", validateScheme(userSchema), controllerWrapper(login));

module.exports = router;
