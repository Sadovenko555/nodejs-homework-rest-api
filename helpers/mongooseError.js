const mongooseError = (error, _, next) => {
  const { name, code } = error;
  const status = name === "MongoStatusError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};
module.exports = mongooseError;