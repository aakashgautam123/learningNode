const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const user = new Schema({
  userName: String,
  password: String,
  email: String
});
const User = mongoose.model("User", user);
module.exports = User;
