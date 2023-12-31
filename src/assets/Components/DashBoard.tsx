import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import Card from "./Card";
import LandingPage from "./LandingPage";
import handleNoteClick from "../controller/handleNoteClick";
import newNoteHandle from "../controller/newNoteHandle";
import handleNoteDelete from "../controller/handleNoteDelete";

type NoteType = {
  _id: string;
  user: string;
  title: string;
  content: string;
};

export default function () {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setNotes(response.data.user);
      });
  }, []);

  return (
    <>
      <LandingPage logedIN={true}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            top: "20%",
            padding: "30px",
          }}
        >
          <Grid container spacing={8}>
            {notes.map((note) => {
              return (
                <Grid item xl={2}>
                  <Card
                    id={note._id}
                    key={note._id}
                    title={note.title}
                    content={note.content}
                    onClick={() =>
                      handleNoteClick({ navigate, notes, _id: note._id })
                    }
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
                </Grid>
              );
            })}
            <Grid item>
              <Card
                onClick={() => newNoteHandle(setNotes)}
                s={{
                  overflow: "hidden",
                  height: "70px",
                  width: "170px",
                  fontSize: "50px",
                }}
                c={"+"}
                title={""}
                content={""}
              ></Card>
            </Grid>
          </Grid>
        </div>
      </LandingPage>
    </>
  );
}
