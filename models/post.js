const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  textContent: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  // img: {
  //   type: Object,
  // },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const validatePost = (data) => {
  const schema = Joi.object({
    textContent: Joi.string().label("textContent"),
    createdBy: Joi.string().label("createdById"),
    // img: Joi.Object().label("image"),
  });
  return schema.validate(data);
};

const Post = mongoose.model("Post", postSchema);

module.exports = { Post, validatePost };
