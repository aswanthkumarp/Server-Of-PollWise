const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

let User = require("../models/user");
let env = require("./environment");
// Options to be passed with the strategy

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_key,
  passReqToCallback: true,
};

passport.use(
  new JWTStrategy(opts, async function (req, jwtPayload, done) {
    // Identifies the user
    let user = await User.findById(jwtPayload.id);
    // console.log(111,user)
    // If identified
    if (user) {
      const loggedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      req.user = loggedUser;
      // console.log(222,req.user)
      done(null, loggedUser);
    } else {
      // User not Identified and null is passed as argument
      console.log("No user found");
      done(null, false);
    }
  })
);

module.exports = passport;
