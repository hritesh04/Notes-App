import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import handleSignIn from "../controller/handleSignIn";

export default function ({ logedIN }) {
  const [login, setLogin] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    handleSignIn(user, pass, logedIN, navigate, setLogin);
  };

  return (
    <>
      <Card
        style={{
          position: "absolute",
          display: `${logedIN}`,
          zIndex: "2",
          top: "40%",
          left: "44%",
          padding: "15px 30px 0px 15px",
          border: "1px solid black",
        }}
      >
        <input
          type="text"
          placeholder="username"
          style={{ margin: "10px 5px" }}
          onChange={(event) => setUser(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          style={{ margin: "5px" }}
          onChange={(event) => setPass(event.target.value)}
        />
        <br />
        <Button
          style={{
            margin: "5px",

            color: "white",
            backgroundColor: "#422605",
          }}
          onClick={handleLogin}
        >
          Submit
        </Button>
        <h3 style={{ color: "red" }}>{login}</h3>
      </Card>
    </>
  );
}
