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
      console.log(jwt_payload.data)
      // const value = await redis.get(jwt_payload.userId);
      // if (value) {
      //   user = JSON.parse(value);
      //   console.log(user);
      // } else {
        const user = await prisma.User.findUnique({
          where: {
            email: jwt_payload.data.email,
          },
        });
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
