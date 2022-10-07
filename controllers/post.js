const express = require("express");
const { Post, validatePost } = require("../models/post");

const getAllPosts = async (req, res, next) => {
  try {
    const Posts = await Post.find({});
    res.status(200).send({ Posts });
  } catch (e) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getPost = async (req, res, next) => {
  try {
    const PostData = await Post.find({ _id: req.query.id });
    res.status(200).send({ PostData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addPost = async (req, res, next) => {
  try {
    let postData = { ...req.body, createdBy: req.user._id.toString() };
    const { error } = validatePost(postData);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    console.log(postData);
    await new Post(postData).save();
    res.status(201).send({ message: "Post Created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deletePost = async (req, res, next) => {
  try {
    let postData;
    PostData = await Post.findOneAndDelete({ _id: req.query.id });
    if (postData) res.status(204).send({ PostData });
    else res.status(204).send({ message: "No such posts exists" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const updatePost = async (req, res, next) => {
  try {
    let postData;
    PostData = await Post.findOneAndReplace(
      { _id: req.query.id },
      req.query.postData
    );
    if (postData) res.status(204).send({ PostData });
    else res.status(204).send({ message: "No such posts exists" });
  } catch (e) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = {
  getAllPosts,
  getPost,
  addPost,
  deletePost,
};
