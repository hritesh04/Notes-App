import mongoose from "mongoose";

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

export const Notes = mongoose.model("Notes", noteSchema);
export const Users = mongoose.model("Users", userSchema);
