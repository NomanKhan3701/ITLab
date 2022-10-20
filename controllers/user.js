const express = require("express");
const argon2 = require("argon2");
const Post = require("../models/post");
const redis = require("../middleware/redis");
const { User, validateSignup, validateLogin } = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).send({ users });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.id });
    if (user) return res.status(200).send(user);
    else return res.status(404).send({ message: "User Not found" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { error } = validateSignup(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({
      email: req.body.email,
    });
    if (user)
      return res
        .status(409)
        .send({ message: "Admin with given Email already exists!" });
    const hashPassword = await argon2.hash(req.body.password);
    const newUser = await new User({
      ...req.body,
      password: hashPassword,
    }).save();
    const token = newUser.generateAuthToken();
    newUser.password = undefined;
    res.status(201).send({
      message: "User Created successfully",
      data: { token: token, user: newUser },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const login = async (req, res, next) => {
  try {
    console.log("Jello");
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return res.status(401).send({ message: "Invalid Email  or Password" });

    if (await argon2.verify(user.password, req.body.password)) {
      const token = user.generateAuthToken();
      await redis.set(user._id.toString(), JSON.stringify(user));
      return res.status(200).send({
        token: "Bearer " + token,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(401).send({ message: "Invalid Password" }); // password did not match
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  login,
  signup,
};
