const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt"); //bcrypt module is used for hashing the password
router.post("/register", async function(req, res) {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  //making a new user object from user model and setting its properties
  const user = new User();
  user.userName = username;
  user.password = await bcrypt.hash(password, 10); // it takes two parameter one password to hash and next one is salt Rounds it can be any integer value
  user.email = email;

  //save a user object in collection  using save method
  user.save(function(err) {
    if (err) console.log("user not saved in database", err); // no need to use curly  bracket if written in one line
    res.status(201).json(user); // sending back the user object with details if saved in database
  });
});

router.post("/login", async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  //search user in database if he/she exist or not

  try {
    const user = await User.findOne({ userName: username });
    if (user) {
      let result = await bcrypt.compare(password, user.password); //verify method takes two input one password from user and one from db the hashed one

      if (result === true) {
        res.status(200).json({ message: "Login success" });
      } else {
        res.status(401).json({ messagee: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "user doesn't exists" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
