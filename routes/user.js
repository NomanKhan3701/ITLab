const express = require("express");
const router = express.Router();
const {
	createUser,
	getUser,
	getAllUsers,
	login,
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/signup", createUser);
router.post("/login", login);

module.exports = router;
