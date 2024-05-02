const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
