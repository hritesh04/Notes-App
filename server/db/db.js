const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  title: String,
  content: String,
});

const Notes = mongoose.model("Notes", noteSchema);
const Users = mongoose.model("Users", userSchema);

module.exports = { Users, Notes };
