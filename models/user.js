const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: Number
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
