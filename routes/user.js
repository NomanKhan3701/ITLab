const express = require("express");
const router = express.Router();
const { signup, getUser, getAllUsers, login } = require("../controllers/user");

router.get("/userlist", getAllUsers);
router.get("/", getUser);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
