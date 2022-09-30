const express = require("express");
const router = express.Router();
const {
	deletePost,
	getPost,
	getAllPosts,
	addPost,
} = require("../controllers/post");

router.get("/", getAllPosts);
router.get("/getPost/:id", getPost);
router.post("/createPost/:id", addPost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;