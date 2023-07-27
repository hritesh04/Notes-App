const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const SECRET = "AceSeCr3T";

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

const authentication = (req, res, next) => {
  const userJwt = req.headers.authorization;
  if (userJwt) {
    const token = userJwt.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      req.userId = user.id;
      console.log(user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const note = [
  {
    id: 1,
    title: "Hello",
    content: "Kya haal",
  },
  {
    id: 2,
    title: "World",
    content: "haal kya",
  },
];

const Users = mongoose.model("Users", userSchema);
const Notes = mongoose.model("Notes", noteSchema);

mongoose
  .connect("mongodb+srv://acerowl:mv7QbClG6XPacUML@notes0.nd610wc.mongodb.net/")
  .then(() => console.log("DB Connected"));

app.get("/", authentication, async (req, res) => {
  const user = await Notes.find({ user: req.userId });
  if (user) {
    res.status(200).json({ notes: user || [] });
  } else {
    res.status(402).json({ message: "User not Found !" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.headers;
  const user = await Users.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET);
    console.log(token);
    res.status(200).json({ message: "login successfully", token });
  } else {
    res.status(404).json({ message: "Invalid Credentials" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body.credentials;
  const user = await Users.findOne({ username });
  if (user) {
    res.status(401).json({ message: "User already Exists" });
  } else {
    const newUser = new Users({ username, password, email });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET);
    console.log(token);
    res.status(200).json({ message: "SignUp successfully", token });
  }
});

app.post("/edit", authentication, async (req, res) => {
  const newNote = new Notes({ user: req.userId });
  await newNote.save();
  console.log(newNote);
  res.status(200).json(newNote);
});

app.get("/edit/:noteId", authentication, async (req, res) => {
  const { noteId } = req.params;
  const note = await Notes.findOne({ _id: noteId, user: req.userId });
  if (note === []) {
    res.status(402).json({ message: "Note not found" });
  }
  res.status(200).json(note);
});

app.patch("/edit/:noteId", authentication, async (req, res) => {
  const { noteId } = req.params;
  const body = req.body.note;
  const updatedNote = await Notes.findOneAndUpdate(
    { _id: noteId, user: req.userId },
    { title: body.title, content: body.content }
  ).catch((error) => {
    res.json({ error: "Failed to update" });
  });
  if (!updatedNote) {
    res.status(404).json({ error: "Todo not found" });
  }
  const update = await Notes.findOne({ _id: noteId });
  res.status(200).json(update);
});

app.delete("/:noteId", authentication, async (req, res) => {
  const { noteId } = req.params;
  const note = await Notes.findOneAndDelete({ _id: noteId, user: req.userId });
  if (note) {
    res.status(200).json(note);
  } else {
    res.status(400).json({ message: "Not Deleted" });
  }
});

app.listen(3000, () => {
  console.log("Server is on !");
});
