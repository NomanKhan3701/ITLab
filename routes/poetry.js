const express = require("express");
const router = express.Router();
var passport = require("../strategy/JwtStrategy");

const {
    getPoetryByPoets, showPoets,getPoetWithImage
} = require("../controllers/poetry");

router.get(
  "/",
  //passport.authenticate("user", { session: false }),
  getPoetryByPoets
);

router.get(
  "/poets",
  //passport.authenticate("user", { session: false }),
  showPoets
)

router.get(
  "/images",
  getPoetWithImage
)
module.exports = router;