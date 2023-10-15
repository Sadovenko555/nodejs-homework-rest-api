const express = require("express");
const router = express.Router();

const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateFunc, isValidId } = require("../../middlewares");

const { schema, updateFavoriteSchema } = require("../../models/contacts");

router.get("/", getAll);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateFunc(schema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFunc(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;