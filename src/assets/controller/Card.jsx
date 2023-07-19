import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ({ id, title, content, onClick }) {
  return (
    <div className="notes" style={{ margin: "30px" }} onClick={onClick}>
      <p>{title}</p>
      <p>{content}</p>
      <Button
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "#eb0202",
          borderColor: "black",
        }}
        onClick={(event) => {
          event.stopPropagation();
          axios
            .delete(`http://localhost:3000/${id}`)
            .then(() =>
              setNote((prevNotes) => prevNotes.filter((note) => note.id !== id))
            );
        }}
      >
        DELETE
      </Button>
    </div>
  );
}
