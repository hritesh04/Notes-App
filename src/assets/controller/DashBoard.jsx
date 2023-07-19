import axios from "axios";
import { useState, useEffect, createContext } from "react";
import LandingPage from "./LandingPage";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function () {
  const [note, setNote] = useState([
    {
      id: 123,
      title: "cytu",
      description: "ufjvvh",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/").then((response) => {
      setNote(response.data);
    });
  }, []);

  const handleNoteClick = (id) => {
    console.log(id);
    navigate(`/edit/${id}`, {
      state: {
        id: id,
        note: note,
      },
    });
  };

  return (
    <>
      <LandingPage logedIN={true}>
        <div
          style={{
            display: "flex",
            position: "relative",
            top: "20%",
            paddingLeft: "30px",
          }}
        >
          {note.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onClick={() => handleNoteClick(note.id)}
            />
          ))}
        </div>
      </LandingPage>
    </>
  );
}
