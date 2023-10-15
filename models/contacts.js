const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { mongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", mongooseError);

const schema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const Contact = model("contact", contactSchema);

module.exports = { Contact, schema, updateFavoriteSchema };