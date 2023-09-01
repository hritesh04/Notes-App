type NoteType = {
  _id: string;
  user: string;
  title: string;
  content: string;
};
import axios from "axios";
const handleNoteDelete = async (
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>,
  _id: string
) => {
  axios
    .delete(`http://localhost:3000/${_id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(() =>
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== _id))
    );
};

export default handleNoteDelete;
