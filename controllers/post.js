const { validatePost } = require("../models/post");
const prisma = require("../models/prisma");

const getAllPosts = async (req, res, next) => {
  try {
    const Posts = await prisma.post.findMany({});
    res.status(200).send({ Posts });
  } catch (e) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getPost = async (req, res, next) => {
  try {
    const PostData = await  prisma.post.findUnique({
      where: {
        postId: Number(req.query.id),
      },
    });
    res.status(200).send({ PostData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addPost = async (req, res, next) => {
  try {
    let postData = { ...req.body, createdBy: req.user.userId.toString() };
    const { error } = validatePost(postData);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    //console.log(postData);
    const newPost = await prisma.post.create({
      data: postData,
    });
    //await new Post(postData).save();
    res.status(201).send({ message: "Post Created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deletePost = async (req, res, next) => {
  try {
    let PostData;
    PostData = await prisma.post.delete({
      where:{ postId: req.query.id },});
    if (PostData) res.status(204).send({ PostData });
    else res.status(204).send({ message: "No such posts exists" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const updatePost = async (req, res, next) => {
  try {
    let updatedPost;
    if (req.query.id) {
      updatedPost = await Post.findOneAndUpdate(
        { _id: req.query.id },
        { textContent: req.query.textContent }
      );
    }
    if (updatePost) res.status(204).send({ updatedPost });
    else res.status(204).send({ message: "No such posts exists" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = {
  getAllPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
};
