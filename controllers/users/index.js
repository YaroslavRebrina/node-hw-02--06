const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getUserInfo = require("./getUserInfo");
const subscriptionUpdate = require("./subscriptionUpdate");
const avatarUpdate = require("./avatarUpdate");
const verification = require("../../services/email/verification");
const verificationResending = require("../../services/email/verificationResending");

module.exports = {
  register,
  login,
  logout,
  getUserInfo,
  subscriptionUpdate,
  avatarUpdate,
  verification,
  verificationResending,
};
