/////// app.js

require('dotenv').config();
const path = require("node:path");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");

app.use("/", loginRouter);
app.use("/sign-up", signupRouter);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("app listening on port 3000!"));
