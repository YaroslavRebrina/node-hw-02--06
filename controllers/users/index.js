const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getUserInfo = require("./getUserInfo");
const subscriptionUpdate = require("./subscriptionUpdate");
const avatarUpdate = require("./avatarUpdate");
const verification = require("./verification");
const verificationResending = require("./verificationResending");

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
