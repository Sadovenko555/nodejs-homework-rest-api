const { Contact } = require("../../models/contacts");

const { controllerWrapper, HttpError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;
  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

module.exports = {
  updateContact: controllerWrapper(updateContact),
};
