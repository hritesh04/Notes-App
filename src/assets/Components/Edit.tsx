import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "axios";
import Card from "./Card";
import Appbar from "./Appbar";
import Feature from "./Feature";
import handleNoteClick from "../controller/handleNoteClick";
import newNoteHandle from "../controller/newNoteHandle";
import handleSubmit from "../controller/handleSubmit";

type NoteType = {
  _id: string;
  user: string;
  title: string;
  content: string;
};

export default function () {
  const location = useLocation();
  const { _id, note }: { _id: string; note: NoteType[] } = location.state;
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NoteType[]>(note);

  const noteSwitch = async (_id: string) => {
    await save();
    handleNoteClick({ navigate, notes: notes, _id });
  };

  const addNote = async () => {
    console.log("new note");
    const res = await newNoteHandle(setNotes);
    navigate(`/edit/${res.data._id}`, {
      state: {
        _id: res.data._id,
        note: notes,
      },
    });
  };

  const save = async () => {
    let title = titleRef.current.textContent;
    let node: HTMLElement[] = Array.from(contentRef.current.childNodes);
    console.log(contentRef.current);
    console.log(node);
    let str = ``;
    node.map((n) => (str += n.textContent + "\n"));
    await handleSubmit(title, str, setNotes, _id);
  };

  useEffect(() => {
    setTitle("");
    setData("");
    axios
      .get(`http://localhost:3000/edit/${_id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        const { title, content } = response.data;
        setTitle(title);
        setData(content);
      });
  }, [navigate]);

  return (
    <>
      <Appbar logedIN={true} />
      <div
        style={{
          height: "90vh",
          maxHeight: "112vh",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid item md={1.8} xs={0.01}>
            <div
              style={{
                display: "flex",
                maxHeight: "100vh",
                marginTop: "65px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  paddingTop: "20px",
                  overflow: "auto",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                {notes.map((n) => (
                  <Card
                    key={n._id}
                    id={n._id}
                    title={n.title}
                    content={n.content}
                    onClick={() => noteSwitch(n._id)}
                    d={{ margin: "10px" }}
                  />
                ))}
              </div>
            </div>
          </Grid>
          <Grid item md={10.2} xs={11.99}>
            <div
              style={{
                marginTop: "75px",
                marginLeft: "5px",
                padding: "15px",
                height: "74vh",
                maxHeight: "112vh",
              }}
            >
              <h1
                contentEditable="true"
                style={{ outline: "none", marginBottom: "10px" }}
                ref={titleRef}
              >
                {title}
              </h1>
              <pre
                contentEditable="true"
                style={{
                  minHeight: "60vh",
                  maxHeight: "88vh",
                  width: "100%",
                  outline: "none",
                  overflow: "auto",
                }}
                ref={contentRef}
              >
                <div>{data}</div>
              </pre>
              <div style={{ position: "relative" }}>
                <Feature subFun={save} noteFun={addNote} />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
