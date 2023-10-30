const { Contact } = require("../../models/contacts");

const { controllerWrapper, HttpError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;
  const result = await Contact.findOneAndRemove({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  removeContact: controllerWrapper(removeContact),
};
