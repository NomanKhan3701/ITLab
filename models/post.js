const Joi = require("joi");
const validatePost = (data) => {
  const schema = Joi.object({
    content: Joi.string().label("Content"),
    description: Joi.string().label("description"),
  });
  return schema.validate(data);
};

// const Post = mongoose.model("Post", postSchema);

module.exports = { validatePost };
