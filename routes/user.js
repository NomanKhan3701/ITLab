const express = require("express");
const router = express.Router();
const { signup, getUser, getAllUsers, login, editProfileImage } = require("../controllers/user");

router.get("/userlist", getAllUsers);
router.get("/", getUser);
router.post("/signup", signup);
router.post("/login", login);
router.patch("/image/:userId", editProfileImage);

module.exports = router;
