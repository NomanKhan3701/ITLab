const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Post = require("../models/post");

const getAllUsers = async (req, res) => {
	try {

	} catch (e) {
		console.log(e);
		res.status(400).send({ message: "error" });
	}
};

const getUser = async (req, res) => {
	try {

	} catch (e) {
		console.log(e);
		res.status(400).send({ message: "error" });
	}
};

const login = async (req, res) => {
	try {

	} catch (e) {
		console.log(e);
		res.status(400).send({ message: "error" });
	}
};

const createUser = async (req, res) => {
	try {

	} catch (e) {
		console.log(e);
		res.status(400).send({ message: "error" });
	}
};

module.exports = {
	getAllUsers,
	getUser,
	createUser,
	login,
};
