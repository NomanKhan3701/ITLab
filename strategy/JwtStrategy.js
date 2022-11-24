const passport = require("passport");
const prisma = require("../models/prisma");
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
      const value = await redis.get(jwt_payload.data.userId.toString());
      if (value) {
        user = await JSON.parse(value);
        console.log("User from redis", user);
      } else {
        user = await prisma.User.findUnique({
          where: {
            email: jwt_payload.data.email,
          },
        });
        console.log("User from redis", user);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.error(error);
      return done(error, false);
    }
  })
);

module.exports = passport;
