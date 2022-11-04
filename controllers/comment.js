// const express = require("express");
// const Comment = require("../models/comment");
// const User = require("../models/user");
// const Post = require("../models/post");

// const getAllComments = async (req, res) => {
//   try {
//     const comments = await Comment.find({});
//     res.status(200).send({ comments });
//   } catch (e) {
//     console.log(e);
//     res.status(400).send({ message: "error" });
//   }
// };

// const getComment = async (req, res) => {
//   try {
//     const commentId = req.params.id;
//     const comments = await Comment.findById(commentId);
//     res.status(200).send({ comments });
//   } catch (e) {
//     console.log(e);
//     res.status(400).send({ message: "error" });
//   }
// };

// const addComment = async (req, res) => {
//   try {
//     const { userId, desc } = req.body;
//     const postId = req.params.id;

//     const post = await Post.findById(postId);
//     const user = await User.findById(userId);

//     if (user === null || post === null) {
//       return res.status(400).send({ message: "Not valid params" });
//     } else {
//       const comment = new Comment({
//         user: userId,
//         desc: desc,
//         createdAt: new Date().toISOString(),
//       });
//       const commentId = comment._id;
//       await comment.save();
//       post.comment.push(commentId);
//       await post.save();
//       res.status(201).send({ message: "Comment saved" });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(400).send({ message: e });
//   }
// };

// const addReply = async (req, res) => {
//   const { userId, desc } = req.body;
//   const commentId = req.params.id;

//   try {
//     const comment = await Comment.findById(commentId);
//     const replyComment = new Comment({
//       user: userId,
//       desc: desc,
//       createdAt: new Date().toISOString(),
//     });
//     comment.reply.push(replyComment._id);
//     await comment.save();
//     await replyComment.save();
//     res.status(201).send({ message: "Reply saved and comment updated" });
//   } catch (e) {
//     console.log(e);
//     res.status(400).send({ message: "error" });
//   }
// };

// module.exports = { getAllComments, addComment, addReply, getComment };
