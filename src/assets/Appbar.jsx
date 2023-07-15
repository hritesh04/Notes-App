import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SignIN from "./SignIN";
import SignUp from "./SignUp";

export default function ({ logedIN = false }) {
  const [isSignnedIN, setIsSIgnnedIN] = useState(logedIN);
  const [signinPage, setSigninPage] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setSigninPage((prev) => !prev);
    if (signupPage === true) setSignupPage((prev) => false);
  };

  const handleSignUp = () => {
    setSignupPage((prev) => !prev);
    if (signinPage === true) setSigninPage((prev) => false);
  };

  const handleLogOut = () => {
    navigate("/");
  };

  function LogIN() {
    return (
      <>
        <Button
          style={{
            marginRight: "20px",
            backgroundColor: "#ffff",
            color: "black",
          }}
          onClick={handleSignIn}
          className="btn"
        >
          SIGN IN
        </Button>
        <Button
          style={{
            marginRight: "20px",
            backgroundColor: "#ffff",
            color: "black",
          }}
          onClick={handleSignUp}
          className="btn"
        >
          SIGN UP
        </Button>
      </>
    );
  }

  function Details() {
    return (
      <>
        <p style={{ marginRight: "10px" }}>Name</p>
        <button onClick={handleLogOut}>LOGOUT</button>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          height: "10vh",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            paddingTop: "15px",
            justifyContent: "space-between",
            boxShadow: "0px 30px 40px 65px #422605",
            backgroundColor: "#422605",
          }}
        >
          <h1 style={{ margin: " 20px", color: "white" }}>Welcome </h1>
          <div style={{ margin: "15px 30px", display: "flex" }}>
            {isSignnedIN ? <Details /> : <LogIN />}
          </div>
        </div>
      </div>
      {signinPage && <SignIN logedIN={setIsSIgnnedIN} />}
      {signupPage && <SignUp logedIN={setIsSIgnnedIN} />}
    </>
  );
}
