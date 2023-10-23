const express = require("express");
const router = express.Router();

const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contact");

const { validateFunc, isValidId, authenticate } = require("../../middlewares");

const { schema, updateFavoriteSchema } = require("../../models/contacts");

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateFunc(schema), addContact);

router.delete("/:contactId", authenticate, isValidId, removeContact);

router.put("/:contactId", authenticate, isValidId, updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFunc(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;