const Joi = require("joi");
const validatePost = (data) => {
  const schema = Joi.object({
    content: Joi.string().label("Content"),
    description: Joi.string().label("description"),
  });
  return schema.validate(data);
};
const validateComment=(data)=>{
   const schema = Joi.object({
    comment: Joi.string().label("Content"),
  });
  return schema.validate(data);
}

// const Post = mongoose.model("Post", postSchema);

module.exports = { validatePost ,validateComment};
