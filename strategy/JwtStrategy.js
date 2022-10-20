const passport = require("passport");
const { User } = require("../models/user");
const redis = require("../middleware/redis");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTPRIVATEKEY,
};

passport.use(
  "user",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      let user;
      const value = await redis.get(jwt_payload._id.toString());
      if (value) {
        user = JSON.parse(value);
        console.log(user);
      } else {
        user = await User.findOne({
          _id: jwt_payload._id,
        });
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      console.error(error);
      return done(error, false);
    }
  })
);

module.exports = passport;
