//User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String
});

module.exports = mongoose.model("User", userSchema);