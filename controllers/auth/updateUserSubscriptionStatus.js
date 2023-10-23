const { User } = require("../../models/user");

const { controllerWrapper, HttpError } = require("../../helpers");

const updateUserSubscriptionStatus = async (req, res, next) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate({ _id }, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = {
  updateUserSubscriptionStatus: controllerWrapper(updateUserSubscriptionStatus),
};