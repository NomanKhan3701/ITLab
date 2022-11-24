const Joi = require("joi");
const validatePost = (data) => {
  const schema = Joi.object({
    content: Joi.string().label("Content"),
    description: Joi.string().label("description"),
    tags: Joi.array().items(Joi.string()).label("tags"),
  });
  return schema.validate(data);
};
const validateComment=(data)=>{
   const schema = Joi.object({
    postPostId:Joi.number().label("PostId"),
    userUserId:Joi.number().label("Author Id"),
    comment: Joi.string().label("Content"),
  });
  return schema.validate(data);
}

// const Post = mongoose.model("Post", postSchema);

module.exports = { validatePost ,validateComment};
