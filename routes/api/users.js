const express = require("express");

const { controllerWrapper } = require("../../heplers");
const {
  userSchema,
  validateScheme,
  isAuthorized,
  upload,
} = require("../../middlewares");

const {
  register,
  login,
  logout,
  getUserInfo,
  subscriptionUpdate,
  avatarUpdate,
} = require("../../controllers/users");

const {
  verification,
  verificationResending,
  verifySchema,
} = require("../../services");
const router = express.Router();

router.post(
  "/register",
  validateScheme(userSchema),
  controllerWrapper(register)
);

router.post(
  "/verify",
  validateScheme(verifySchema),
  controllerWrapper(verificationResending)
);

router.get("/verify/:verificationToken", controllerWrapper(verification));

router.post("/login", validateScheme(userSchema), controllerWrapper(login));

router.post("/logout", isAuthorized, controllerWrapper(logout));

router.get("/current", isAuthorized, controllerWrapper(getUserInfo));

router.patch(
  "/subscription",
  isAuthorized,
  controllerWrapper(subscriptionUpdate)
);

router.patch(
  "/avatars",
  isAuthorized,
  upload.single("avatar"),
  controllerWrapper(avatarUpdate)
);

module.exports = router;
