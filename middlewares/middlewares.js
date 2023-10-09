const HttpError = require("../helpers/HttpError");

const validateFunc = (schema) => {
  const func = (req, res, next) => {
    if (req.method === "POST" && req.body) {
      const { error } = schema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
    }
    next();
  };
  return func;
};

module.exports = { validateFunc };
