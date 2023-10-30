const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const gravatar = require("gravatar");
const { controllerWrapper, HttpError } = require("../../helpers");

const registr = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({ email, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = {
  registr: controllerWrapper(registr),
};