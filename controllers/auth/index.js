const { registr } = require("./registr");
const { login } = require("./login");
const { current } = require("./current");
const { logout } = require("./logout");
const { updateUserSubscriptionStatus } = require("./updateUserSubscriptionStatus");
const { updateUserAvatar } = require("./updateUserAvatar");
const { verifyEmail } = require("./verifyEmail");
const { resendVerifyEmail } = require("./resendVerifYEmaol");
module.exports = {
  registr,
  login,
  current,
  logout,
  updateUserSubscriptionStatus,
  updateUserAvatar,
  verifyEmail,
  resendVerifyEmail
};