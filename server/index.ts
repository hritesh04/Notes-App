import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Users, Notes } from "./db/db";
import { authentication } from "./middleware/authentication";

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = process.env.SECRET;

mongoose.connect(process.env.DB_LINK).then(() => console.log("DB Connected"));

interface CreateNewUser {
  username: String;
  password: String;
  email: string;
}

interface Update {
  title: string;
  content: string;
  user: string;
}

type UpdateNote = Partial<Update>;

const LogInInput = z.object({
  username: z.string(),
  password: z.string(),
});

const NoteEdit = z.object({
  title: z.string(),
  content: z.string(),
});

const credential = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});

app.get("/", authentication, async (req, res) => {
  const userId = req.headers["userId"];
  const user = await Notes.find({ user: userId });
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(402).json({ message: "User not Found !" });
  }
});

app.post("/signin", async (req, res) => {
  const creds = LogInInput.safeParse(req.headers);
  if (!creds.success) {
    return res.status(404).json({ message: "Invalid Credentials" });
  }
  const { username, password } = creds.data;
  const user = await Users.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET);
    console.log(token);
    res.status(200).json({ message: "login successfully", token, username });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

app.post("/signup", async (req, res) => {
  const input: CreateNewUser = req.body.credentials;
  const credentials = credential.safeParse(input);
  if (!credentials.success) {
    return res.status(401).json({ messagae: "Invalid Input" });
  }
  const user = await Users.findOne({ username: input.username });
  if (user) {
    res.status(401).json({ message: "User already Exists" });
  } else {
    const newUser = new Users({
      username: input.username,
      password: input.password,
      email: input.email,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET);
    res.status(200).json({ message: "SignUp successfully", token });
  }
});

app.post("/edit", authentication, async (req, res) => {
  const userId = req.headers["userId"];
  const newNote = new Notes({ user: userId });
  await newNote.save();
  res.status(200).json(newNote);
});

app.get("/edit/:noteId", authentication, async (req, res) => {
  const { noteId } = req.params;
  const userId = req.headers["userId"];

  const note = await Notes.findOne({ _id: noteId, user: userId });
  if (!note) {
    res.status(402).json({ message: "Note not found" });
  }
  res.status(200).json(note);
});

app.patch("/edit/:noteId", authentication, async (req, res) => {
  const { noteId } = req.params;
  const userId = req.headers["userId"];
  const input: UpdateNote = req.body.note;
  const body = NoteEdit.safeParse(input);
  if (!body.success) {
    return res.status(401).json({ message: "Invalid Input" });
  }
  const updatedNote = await Notes.findOneAndUpdate(
    { _id: noteId, user: userId },
    { title: body.data.title, content: body.data.content }
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
  const userId = req.headers["userId"];

  const note = await Notes.findOneAndDelete({ _id: noteId, user: userId });
  if (note) {
    res.status(200).json(note);
  } else {
    console.log("error");
    res.status(400).json({ message: "Not Deleted" });
  }
});

app.listen(3000, () => {
  console.log("Server is on !");
});
