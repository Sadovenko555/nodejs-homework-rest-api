const { Contact } = require("../../models/contacts");

const { controllerWrapper } = require("../../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const query = { owner };
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite !== undefined) {
    query.favorite = favorite;
  }
 
  const result = await Contact.find(query, "-createdAt -updatedAt", { skip, limit });
  res.json(result);
};

module.exports = {
  getAll: controllerWrapper(getAll),
};