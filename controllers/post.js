const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");

const getAllPosts = async (req, res) => {
	try {

	} catch (e) {
		console.log(e);
		res.status(400).send({ message: "error" });
	}
};

const getPost = async (req, res) => {
	try {
	
	} catch (e) {
		console.log(e);
		res.status(400).send({ message: e });
	}
};

const addPost = async (req, res) => {
	try {

	} catch (e) {
		console.log(e);
		res.status(400).send({ message: "error" });
	}
};

const deletePost = async (req, res) => {
	try {

	} catch (e) {
		console.log("error ---> ", e);
		res.status(400).send({ message: "error" });
	}
};

module.exports = {
	getAllPosts,
	getPost,
	addPost,
	deletePost,
};
