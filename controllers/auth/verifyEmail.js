const { User } = require("../../models/user");

const { controllerWrapper, HttpError } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const result = await User.findOne({ verificationToken }, { new: true });
  if (!result) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(result._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json("Verification successful");
};

module.exports = {
  verifyEmail: controllerWrapper(verifyEmail),
};