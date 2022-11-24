const { validatePost, validateComment } = require("../models/post");
const prisma = require("../models/prisma");

const getAllPosts = async (req, res, next) => {
  try {
    const Posts = await prisma.post.findMany({
      select: {
        postId: true,
        createdBy: {
          select: {
            userId: true,
            userName: true,
            email: true,
          }
        },
        Likes: true,
        content: true,
        description: true,
        tags: true,
      }
    });
    res.status(200).send({ Posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getPost = async (req, res, next) => {
  try {
    //console.log(req.user)
    const PostData = await prisma.post.findUnique({
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
    let postData = req.body;
    const { error } = validatePost(postData);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    //console.log(postData);
    postData = { ...postData, usersUserId: req.user.userId }
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
      where: { postId: Number(req.query.id) },
    });
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
      updatedPost = await prisma.post.update(
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

const likePost = async (req, res, next) => {
  try {
    const data = { userUserId: (Number)(req.user.userId), postPostId: (Number)(req.params.postPostId) }
    const like = await prisma.likes.findFirst({
      where: data,
    });

    if (like) {
      await prisma.likes.delete({ where: { likeId: like.likeId } });
    }
    else {
      await prisma.likes.create({ data });
    }
    const Likes = await prisma.likes.findMany({
      where: {
        postPostId: Number(req.params.postPostId),
      }
    })
    return res.status(202).send({
      Likes
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
const addComment = async (req, res, next) => {
  try {
    const data = req.body;
    data.userUserId = Number(req.user.userId);
    const { error } = validateComment(data);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });
    const comment = await prisma.Comments.create({
      data: data,
    });
    const comments = await prisma.Comments.findMany({
      where: {
        postPostId: Number(req.body.postPostId),
      },
      include: {
        createdBy: true,
      }
    });
    res.status(201).send(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
}
module.exports = {
  getAllPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
  likePost,
  addComment,
};
