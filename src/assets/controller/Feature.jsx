import { Button } from "@mui/material";
import { useState } from "react";
export default function ({ subFun, noteFun }) {
  const [dropDown, setDropDown] = useState(false);

  const features = [
    {
      id: 1,
      type: "Add New Note",
      icon: "PLUS",
      handleClick: noteFun,
    },
    {
      id: 2,
      type: "Add Image",
      icon: "IMG",
      handleClick: function () {
        console.log(this.type);
      },
    },
    {
      id: 3,
      type: "SAVE",
      icon: "IMG",
      handleClick: subFun,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        textAlign: "center",
        position: "fixed",
        bottom: "10%",
        color: "green",
        right: "10%",
        borderRadius: "150px",
      }}
      onClick={() => setDropDown(!dropDown)}
    >
      <svg
        fill="#422605"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="80px"
        height="80px"
        viewBox="-24.75 -24.75 74.25 74.25"
        xml:space="preserve"
        stroke="#422605"
        stroke-width="0.0002475"
        transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
          stroke-width="0.1485"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <path d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2 c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2 c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"></path>{" "}
          </g>{" "}
        </g>
      </svg>
      {dropDown && (
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            position: "relative",
          }}
        >
          {features.map((feature) => (
            <Button
              key={feature.id}
              style={{ color: "#422605" }}
              onClick={(event) => {
                event.stopPropagation();
                feature.handleClick();
              }}
            >
              {feature.type}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
