const { Contact } = require("../../models/contacts");

const { controllerWrapper, HttpError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  updateStatusContact: controllerWrapper(updateStatusContact),
};