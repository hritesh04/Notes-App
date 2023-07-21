import axios from "axios";
import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function () {
  const [notes, setNotes] = useState([
    {
      id: 123,
      title: "cytu",
      description: "ufjvvh",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const handleNoteClick = (id) => {
    navigate(`/edit/${id}`, {
      state: {
        id: id,
        note: notes,
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
            top: "25%",
            paddingLeft: "30px",
          }}
        >
          {notes.map((note) => {
            return (
              <Card
                key={note.id}
                title={note.title}
                content={note.content}
                onClick={() => handleNoteClick(note.id)}
                s={{ overflow: "hidden", height: "70px", width: "170px" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#eb0202",
                    borderColor: "black",
                    width: "100%",
                    borderRadius: "20px",
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    axios
                      .delete(`http://localhost:3000/${note.id}`)
                      .then(() =>
                        setNotes((prevNotes) =>
                          prevNotes.filter((n) => n.id !== note.id)
                        )
                      );
                  }}
                >
                  DELETE
                </Button>
              </Card>
            );
          })}
        </div>
      </LandingPage>
    </>
  );
}
