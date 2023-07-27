import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

export default function ({ logedIN }) {
  const [login, setLogin] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    console.log("event triggered");
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        credentials: {
          username: user,
          password: pass,
          email: email,
        },
      });
      console.log(res);
      if (res.status === 200) {
        logedIN(true);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setLogin(error.response?.data?.message);
    }
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
        <button
          style={{
            position: "absolute",
            top: "6%",
            right: "7%",
            height: "10px",
            width: "2px",
            color: "#422605",
            border: "none",
          }}
        >
          &#10006;
        </button>
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
        <input
          type="email"
          placeholder="E-Mail"
          style={{ margin: "5px" }}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <Button
          style={{
            marginTop: "10px",
            marginLeft: "5px",
            color: "white",
            backgroundColor: "#422605",
          }}
          onClick={handleLogin}
        >
          REGISTER
        </Button>
        <h1>{login}</h1>
      </Card>
    </>
  );
}
