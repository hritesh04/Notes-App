import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const { _id, note }: { _id: string; note: NoteType } = location.state;
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NoteType[]>([note]);

  const noteSwitch = async (_id) => {
    await save();
    handleNoteClick({ navigate, notes: note, _id });
  };

  const addNote = async () => {
    console.log("new note");
    const res = await newNoteHandle(setNotes);
    navigate(`/edit/${res.data._id}`, {
      state: {
        _id: res.data._id,
        note: { _id: res.data._id, title: "", content: "" },
      },
    });
  };

  const save = async () => {
    const title = titleRef.current.textContent;
    const node: HTMLElement[] = Array.from(contentRef.current.childNodes);
    console.log(contentRef.current);
    console.log(node);
    let str = ``;
    node.map((n) => (str += n.textContent + "\n"));
    await handleSubmit(title, str, setNotes, _id);
  };

  useEffect(() => {
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
          minHeight: "90vh",
          maxHeight: "112vh",
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "75px",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "99%",
              width: "19%",
              paddingTop: "20px",
              overflow: "auto",
              margin: "-15px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            {notes.map((n) => (
              <Card
                key={n._id}
                id={n._id}
                title={n.title}
                content={n.content}
                d={{
                  height: "109px",
                  overflow: "hidden",
                }}
                onClick={() => noteSwitch(n._id)}
              />
            ))}
          </div>
          <div
            style={{
              width: "100%",
              maxHeight: "140%",
              marginLeft: "25px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              paddingLeft: "20px",
            }}
          >
            <h1
              contentEditable="true"
              style={{ outline: "none" }}
              ref={titleRef}
            >
              {title}
            </h1>
            <pre
              contentEditable="true"
              style={{
                minHeight: "61vh",
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
        </div>
      </div>
    </>
  );
}
