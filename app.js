/* eslint-disable no-undef */
/////// app.js

require('dotenv').config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require('connect-pg-simple')(session);
const pgPool = require("./db/pool");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
const homeRouter = require("./routes/home");
const signupRouter = require("./routes/signup");

app.use(session({
  store: new pgSession({
    pool : pgPool  ,
    createTableIfMissing: true
           
  }),
  // express session options
  secret: "cats",
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  saveUninitialized: true
}));

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/sign-up", signupRouter);

app.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("app listening on port 3000!"));
