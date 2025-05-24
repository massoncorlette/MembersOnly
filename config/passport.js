
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool');

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = rows[0];

      console.log(user);

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      //comparing login password to hashed stored password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }
      
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);


passport.serializeUser((user, done) => {
  console.log("serialize");
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    const user = rows[0];


    done(null, user);
  } catch(err) {
    done(err);
  }
});

const authenticateUser = (req, res, next) =>
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })(req, res, next);



module.exports = authenticateUser;

