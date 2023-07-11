const express = require("express");

const { controllerWrapper } = require("../../heplers");
const {
  userSchema,
  validateScheme,
  isAuthorized,
} = require("../../middlewares");

const {
  register,
  login,
  logout,
  getUserInfo,
  subscriptionUpdate,
} = require("../../controllers/users");

const router = express.Router();

router.post(
  "/register",
  validateScheme(userSchema),
  controllerWrapper(register)
);

router.post("/login", validateScheme(userSchema), controllerWrapper(login));

router.post("/logout", isAuthorized, controllerWrapper(logout));

router.get("/current", isAuthorized, controllerWrapper(getUserInfo));

router.patch(
  "/subscription",
  isAuthorized,
  controllerWrapper(subscriptionUpdate)
);

module.exports = router;
