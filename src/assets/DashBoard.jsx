import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import LandingPage from "./LandingPage";
import { Button } from "@mui/material";

export default function () {
  const [note, setNote] = useState([
    {
      id: 123,
      title: "cytu",
      description: "ufjvvh",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:3000/").then((response) => {
      setNote(response.data);
    });
  }, []);

  function Card({ id, title, content }) {
    function handleClick(id) {
      axios
        .delete(`http://localhost:3000/${id}`)
        .then(() =>
          setNote((prevNotes) => prevNotes.filter((note) => note.id !== id))
        );
    }
    return (
      <div className="notes" style={{ margin: "30px" }}>
        <p>{title}</p>
        <p>{content}</p>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#eb0202",
            borderColor: "black",
          }}
          onClick={() => handleClick(id)}
        >
          DELETE
        </Button>
      </div>
    );
  }

  return (
    <>
      <LandingPage logedIN={true}>
        <div
          style={{
            display: "flex",
            position: "relative",
            top: "17%",
            paddingLeft: "30px",
          }}
        >
          {note.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
            />
          ))}
        </div>
      </LandingPage>
    </>
  );
}
