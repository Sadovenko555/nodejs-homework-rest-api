const { Contact } = require("../../models/contacts");

const { controllerWrapper, HttpError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;
  const result = await Contact.findOne({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getContactById: controllerWrapper(getContactById),
};