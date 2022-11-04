const express = require("express");
const router = express.Router();
var passport = require("../strategy/JwtStrategy");

const {
  deletePost,
  getPost,
  getAllPosts,
  addPost,
  updatePost,
} = require("../controllers/post");

router.get(
  "/Posts",
  getAllPosts
);
router.get("/Post", getPost);
router.post("/", addPost);
router.delete(
  "/",
 // passport.authenticate("user", { session: false }),
  deletePost
);
router.patch("/", updatePost);

module.exports = router;
