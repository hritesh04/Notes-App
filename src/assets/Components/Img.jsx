import { Card } from "@mui/material";
import { useState } from "react";

export default function () {
  const FileDrop = () => {
    const [fileUrl, setFileUrl] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (event) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (event) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFileUrl(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Card>
        <div
          style={{
            width: "300px",
            height: "300px",
            border: isDragging ? "2px dashed #333" : "2px dashed #ccc",
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {fileUrl ? (
            <img
              src={fileUrl}
              alt="Dropped File Preview"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <p>Drag and drop a file here</p>
          )}
        </div>
      </Card>
    );
  };
}
