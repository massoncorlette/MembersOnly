/////// app.js

require('dotenv').config();
const path = require("node:path");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

const pool = require("./db/pool");

const loginRouter = require("./routes/login");

app.use("/", loginRouter);





app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/sign-up", (req, res) => res.render("sign-up-form"));

app.post("/sign-up", async (req, res, next) => {
  try {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   await pool.query("insert into users (first, last, email, password) values ($1, $2, $3, $4)", [req.body.firstname, req.body.lastname, req.body.email, hashedPassword]);
   res.redirect("/");
  } catch (error) {
     console.error(error);
     next(error);
    }
 });
 

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
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
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});


app.listen(3000, () => console.log("app listening on port 3000!"));
