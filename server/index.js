const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

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

app.get("/", (req, res) => {
  res.status(200).json(note).end();
});

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = note.find((n) => n.id === id);
  res.status(200).json(task);
});

app.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = note.find((n) => n.id === id);
  res.status(200).json(task);
});

app.delete("/:id", (req, res) => {
  const ids = parseInt(req.params.id);
  const task = note.findIndex((task) => task.id === ids);
  if (task === undefined) {
    res.status(404).end();
  }
  //note = note.filter((task) => task.id !== ids);
  note.splice(task, 1);
  res.status(200).end();
});

app.listen(3000, () => {
  console.log("Server is on !");
});
