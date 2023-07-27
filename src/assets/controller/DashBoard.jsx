import axios from "axios";
import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function () {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.notes);
        setNotes(response.data.notes);
      });
  }, []);

  const newNoteHandle = async () => {
    const res = await axios.post(`http://localhost:3000/edit`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setNotes((prevNote) => [
      ...prevNote,
      { id: notes.length + 1, title: "", content: "" },
    ]);
  };

  const handleNoteClick = (_id) => {
    navigate(`/edit/${_id}`, {
      state: {
        _id: _id,
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
            top: "20%",
            paddingLeft: "30px",
          }}
        >
          {notes.map((note) => {
            return (
              <Card
                key={note._id}
                title={note.title}
                content={note.content}
                onClick={() => handleNoteClick(note._id)}
                s={{
                  overflow: "hidden",
                  height: "70px",
                  width: "170px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#eb0202",
                    borderColor: "black",
                    width: "100%",
                    borderRadius: "20px",
                    position: "absolute",
                    bottom: "0%",
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    axios
                      .delete(`http://localhost:3000/${note._id}`, {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      })
                      .then(() =>
                        setNotes((prevNotes) =>
                          prevNotes.filter((n) => n._id !== note._id)
                        )
                      );
                  }}
                >
                  DELETE
                </Button>
              </Card>
            );
          })}
          <Card
            onClick={newNoteHandle}
            s={{
              overflow: "hidden",
              height: "70px",
              width: "170px",
              fontSize: "50px",
            }}
            c={"+"}
          ></Card>
        </div>
      </LandingPage>
    </>
  );
}
