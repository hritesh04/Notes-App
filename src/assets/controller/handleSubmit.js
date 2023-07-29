import axios from "axios";
const handleSubmit = async (title, str, setNotes, _id) => {
  const res = await axios.patch(
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
  console.log(res.data);
  setNotes((prevNote) =>
    prevNote.map((n) =>
      n._id === _id ? { ...n, title: title, content: str } : n
    )
  );
};

export default handleSubmit;
