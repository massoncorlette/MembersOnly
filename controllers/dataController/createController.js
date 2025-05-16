
const { validationResult } = require("express-validator");


async function handleCreateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("error", {
      errors: errors.array(),
    });
  }

 // const { genrename } = req.body;

 // try {
  // await db.createGenre(genrename); // getting ID from parsed URL from form action value 
 //  res.redirect("/");
//  } catch (err) {
    //res.status(500).send("error");
 // }
}


module.exports = {
  handleCreateUser
}