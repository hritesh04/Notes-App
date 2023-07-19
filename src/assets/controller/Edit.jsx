import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Appbar from "./Appbar";

export default function () {
  const location = useLocation();
  const { id, note } = location.state;
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  const handleSumbmit = () => {
    const title = titleRef.current.textContent;
    const node = Array.from(contentRef.current.childNodes);
    let str = ``;
    node.map((n) => (str += n.textContent + "\n"));
    const note = {
      title: title,
      content: str,
    };
    console.log(note);
    // axios
    //   .patch(`http://localhost:300/edit/${id}`, {
    //     body: {
    //       note
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Updated");
    //   });
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/edit/${id}`).then((response) => {
      const { title, content } = response.data;
      setTitle(title);
      setData(content);
    });
  }, []);

  return (
    <>
      <Appbar logedIN={true} />
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            top: "17%",
            minHeight: "75vh",
            maxHeight: "107vh",
            width: "100%",
            paddingTop: "40px",
          }}
        >
          <div
            style={{
              maxHeight: "103vh",
              width: "15%",
              overflow: "auto",
              margin: "-15px",
            }}
          >
            {note.map((n) => (
              <Card key={n.id} id={n.id} title={n.title} content={n.content} />
            ))}
          </div>
          <div
            style={{
              width: "100%",
              minHeight: "100%",
              outline: "none",
              marginLeft: "25px",
            }}
          >
            <h1 contentEditable="true" ref={titleRef}>
              {title}
            </h1>
            <div
              contentEditable="true"
              style={{
                minHeight: "50vh",
                maxHeight: "88vh",
                width: "100%",
                outline: "none",
                overflow: "auto",
              }}
              ref={contentRef}
            >
              {data}
            </div>
            <button onClick={handleSumbmit}>SUBMIT</button>
          </div>
        </div>
      </div>
    </>
  );
}
