import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

export default function ({ logedIN }) {
  const [login, setLogin] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/signin",
        {},
        {
          headers: {
            username: user,
            password: pass,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        logedIN(true);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setLogin(error.response.data.message);
    }
    // const account = accounts.find((acc) => acc.id === user);
    // if (account !== undefined) {
    //   if ((account.password = parseInt(pass))) {
    //   } else {
    //     setLogin("Wrong Password");
    //   }
    // } else {
    //   setLogin("Invalid Credentials");
    // }
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
        <Button
          style={{
            marginTop: "10px",
            marginLeft: "5px",
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
