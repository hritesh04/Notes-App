import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import Card from "./Card";
import LandingPage from "./LandingPage";
import handleNoteClick from "../controller/handleNoteClick";
import newNoteHandle from "../controller/newNoteHandle";
import handleNoteDelete from "../controller/handleNoteDelete";

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
                onClick={() => handleNoteClick(navigate, notes, note._id)}
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
                    handleNoteDelete(setNotes, note._id);
                  }}
                >
                  DELETE
                </Button>
              </Card>
            );
          })}
          <Card
            onClick={() => newNoteHandle(setNotes)}
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
