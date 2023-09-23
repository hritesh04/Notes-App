import axios from "axios";
import { Dispatch } from "react";

type NoteType = {
  _id: string;
  user: string;
  title: string;
  content: string;
};

const newNoteHandle = async (
  setNotes: Dispatch<React.SetStateAction<NoteType[]>>
) => {
  const res = await axios.post(
    `http://localhost:3000/edit`,
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  console.log(res.data);
  const newNote: NoteType = {
    _id: res.data._id,
    user: res.data.user,
    title: "",
    content: "",
  };
  setNotes((prevNotes) => [...prevNotes, newNote]);
  return res;
};

export default newNoteHandle;
