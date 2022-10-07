const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{ type: mongoose.Types.ObjectId, ref: "Posts" }],
  img: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
const validateSignup = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("firstName"),
    lastName: Joi.string().required().label("lastName"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().label("password"),
  });
  return schema.validate(data);
};
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().label("password"),
  });
  return schema.validate(data);
};
userSchema.methods.generateAuthToken = function (data) {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = { User, validateSignup, validateLogin };
