const express = require("express");
const router = express.Router();
var passport = require("../strategy/JwtStrategy");

const {
    getPoetryByPoets,
} = require("../controllers/poetry");

router.get(
  "/",
  passport.authenticate("user", { session: false }),
  getPoetryByPoets
);

module.exports = router;