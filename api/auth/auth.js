const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

// Register authen
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "txtUsername",
      passwordField: "txtPassword",
    },
    async (uname, password, done) => {
      try {
        const user = await User.findOne({ username: uname });

        if (!user) {
          done(null, false, { message: "Username not exists !" });
        }
        const check = await bcrypt.compare(password, user.password);

        if (!check) {
          done(null, false, { message: "Password is wrong !" });
        }

        return done(null, user, { message: "Login successfully !" });
      } catch (error) {
        return done(error);
      }
    }
  )
);


