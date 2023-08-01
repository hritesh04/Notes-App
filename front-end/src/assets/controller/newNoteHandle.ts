import axios from "axios";

const newNoteHandle = async (setNotes) => {
  const res = await axios.post(
    `http://localhost:3000/edit`,
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  setNotes((prevNote) => [...prevNote, res.data]);
  return res;
};

export default newNoteHandle;
