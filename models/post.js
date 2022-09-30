const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  like: {
    type: [String],
    default: [],
  },
  comment: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
