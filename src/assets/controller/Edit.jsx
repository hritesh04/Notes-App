import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Appbar from "./Appbar";
import { Button } from "@mui/material";
import { Save } from "@mui/icons-material";

export default function () {
  const location = useLocation();
  const { id, note } = location.state;
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const [notes, setNotes] = useState(note);

  const handleNoteClick = async (id) => {
    await handleSumbmit();
    console.log(id);
    navigate(`/edit/${id}`, {
      state: {
        id: id,
        note: notes,
      },
    });
  };

  const handleSumbmit = async () => {
    const title = titleRef.current.textContent;
    const node = Array.from(contentRef.current.childNodes);
    let str = ``;
    node.map((n) => (str += n.textContent + "\n"));
    const note = {
      id: id,
      title: title,
      content: str,
    };
    console.log(JSON.stringify(note));
    const res = await axios.put(
      `http://localhost:3000/edit/${id}`,
      {
        note: note,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    setNotes((prevNote) =>
      prevNote.map((n) =>
        n.id === id ? { ...n, title: title, content: str } : n
      )
    );
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/edit/${id}`).then((response) => {
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
              width: "15%",
              paddingTop: "20px",
              overflow: "auto",
              margin: "-15px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            {notes.map((n) => (
              <Card
                key={n.id}
                id={n.id}
                title={n.title}
                content={n.content}
                d={{ height: "100px", padding: "7px", overflow: "hidden" }}
                onClick={() => handleNoteClick(n.id)}
              />
            ))}
            <Button onClick={() => newNoteHandle}>+</Button>
          </div>
          <div
            style={{
              width: "100%",
              maxHeight: "140%",
              marginLeft: "25px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              padding: "20px",
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
              {data}
            </pre>
            <div style={{ position: "relative" }}>
              <Button
                startIcon={<Save />}
                size="large"
                style={{
                  position: "fixed",
                  bottom: "10%",
                  color: "green",
                  right: "10%",
                  borderRadius: "150px",
                  height: "100px",
                  width: "100px",
                }}
                onClick={handleSumbmit}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
