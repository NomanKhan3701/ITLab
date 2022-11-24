const express = require("express");
const router = express.Router();
var passport = require("../strategy/JwtStrategy");

const {
  deletePost,
  getPost,
  getAllPosts,
  addPost,
  updatePost,
  addComment,
  likePost,
  getPostsbyUsers,
} = require("../controllers/post");

router.get(
  "/Posts",
  passport.authenticate("user", { session: false }),
  getAllPosts
);
router.get("/Post", passport.authenticate('user', { session: false }), getPost);
router.post("/",  passport.authenticate("user", { session: false }), addPost);
router.delete(
  "/",
  passport.authenticate("user", { session: false }),
  deletePost
);
router.patch("/", updatePost);
router.get("/:userUserId",getPostsbyUsers);
router.patch("/like/:postPostId",passport.authenticate("user",{session:false}),likePost);
router.post("/comments",passport.authenticate("user",{session:false}),addComment);

module.exports = router;
