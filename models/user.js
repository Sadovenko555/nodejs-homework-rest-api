const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { mongooseError } = require("../helpers");

const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError);

const registrationSchema = Joi.object({
  password: Joi.string().pattern(passRegex).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().pattern(passRegex).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = { registrationSchema, loginSchema, updateSubscriptionSchema };

const User = model("user", userSchema);

module.exports = { User, schemas };