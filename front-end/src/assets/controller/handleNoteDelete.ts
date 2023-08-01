import axios from "axios";
const handleNoteDelete = async (setNotes, _id) => {
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
