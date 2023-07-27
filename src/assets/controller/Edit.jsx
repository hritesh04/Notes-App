import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Appbar from "./Appbar";
import Feature from "./Feature";

export default function () {
  const location = useLocation();
  const { _id, note } = location.state;
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(false);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const [notes, setNotes] = useState(note || []);
  const [file, setFile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // const FileDrop = () => {
  //   const handleDragEnter = (event) => {
  //     event.preventDefault();
  //     setIsDragging(true);
  //   };

  //   const handleDragLeave = (event) => {
  //     event.preventDefault();
  //     setIsDragging(false);
  //   };

  //   // const handleDrop = (event) => {
  //   //   event.preventDefault();
  //   //   setIsDragging(false);

  //   //   const file = event.dataTransfer.files[0];
  //   //   if (file) {
  //   //     const reader = new FileReader();
  //   //     reader.onload = (e) => {
  //   //       setFileUrl(e.target.result);
  //   //     };
  //   //     reader.readAsDataURL(file);
  //   //   }
  //   // };

  //   return (
  //     <Card>
  //       <div
  //         style={{
  //           width: "300px",
  //           height: "300px",
  //           border: isDragging ? "2px dashed #333" : "2px dashed #ccc",
  //         }}
  //         onDragEnter={handleDragEnter}
  //         onDragLeave={handleDragLeave}
  //         onDragOver={(event) => event.preventDefault()}
  //         //onDrop={handleDrop}
  //       >
  //         {/* {fileUrl ? (
  //           <img
  //             src={fileUrl}
  //             alt="Dropped File Preview"
  //             style={{ maxWidth: "100%", maxHeight: "100%" }}
  //           />
  //         ) : (
  //           <p>Drag and drop a file here</p>
  //         )} */}
  //       </div>
  //     </Card>
  //   );
  // };

  const handleNoteClick = async (_id) => {
    await handleSumbmit();
    console.log(_id);
    navigate(`/edit/${_id}`, {
      state: {
        _id: _id,
        note: notes,
      },
    });
  };

  const newNoteHandle = async () => {
    console.log("new note");
    const res = await axios.post(
      `http://localhost:3000/edit`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
    setNotes((prevNote) => [...prevNote, res.data]);
    navigate(`/edit/${res.data._id}`, {
      state: {
        _id: res.data._id,
        note: { _id: res.data._id, title: "", content: "" },
      },
    });
  };

  const handleSumbmit = async () => {
    const title = titleRef.current.textContent;
    const node = Array.from(contentRef.current.childNodes);
    console.log(node);
    let str = ``;
    node.map((n) => (str += n.textContent + "\n"));
    const note = {
      title: title,
      content: str,
    };
    console.log(note);
    const res = await axios.patch(
      `http://localhost:3000/edit/${_id}`,
      {
        note: note,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data);
    setNotes((prevNote) =>
      prevNote.map((n) =>
        n._id === _id ? { ...n, title: title, content: str } : n
      )
    );
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
                onClick={() => handleNoteClick(n._id)}
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
              {data}
            </pre>
            <div style={{ position: "relative" }}>
              <Feature
                subFun={handleSumbmit}
                addImg={() => setFile(!file)}
                noteFun={newNoteHandle}
              />
            </div>
            {file && <FileDrop />}
          </div>
        </div>
      </div>
    </>
  );
}
