import axios from "axios";
import { Dispatch } from "react";

type NoteType = {
  _id: string;
  user: string;
  title: string;
  content: string;
};
const handleSubmit = async (
  title: string,
  str: string,
  setNotes: Dispatch<React.SetStateAction<NoteType[]>>,
  _id: string
) => {
  await axios.patch(
    `http://localhost:3000/edit/${_id}`,
    {
      note: { title, content: str },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  setNotes((prevNote) =>
    prevNote.map((n) =>
      n._id === _id ? { ...n, title: title, content: str } : n
    )
  );
};

export default handleSubmit;
