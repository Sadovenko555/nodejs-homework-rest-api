const { User } = require("../../models/user");
require("dotenv").config();

const { controllerWrapper, HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;
const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const result = await User.findOne({ email }, { new: true });
  if (!result) {
    throw HttpError(404, "Email not found");
  }
  if (result.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${result.verificationToken}">Follow this link to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  resendVerifyEmail: controllerWrapper(resendVerifyEmail),
};