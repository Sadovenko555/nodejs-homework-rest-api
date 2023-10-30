const { registr } = require("./registr");
const { login } = require("./login");
const { current } = require("./current");
const { logout } = require("./logout");
const { updateUserSubscriptionStatus } = require("./updateUserSubscriptionStatus");
const { updateUserAvatar } = require("./updateUserAvatar");
module.exports = {
  registr,
  login,
  current,
  logout,
  updateUserSubscriptionStatus,
  updateUserAvatar,
};