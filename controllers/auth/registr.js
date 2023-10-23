const bcrypt = require("bcrypt");
const { User } = require("../../models/user");

const { controllerWrapper, HttpError } = require("../../helpers");

const registr = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ email, password: hashPassword });

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