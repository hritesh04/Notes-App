import axios from "axios";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";

const handleSignIn = async (
  user: string,
  pass: string,
  logedIN: boolean,
  navigate: NavigateFunction,
  setLogin: Dispatch<React.SetStateAction<string>>
) => {
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
      logedIN = true;
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    }
  } catch (error) {
    setLogin(error.response.data.message);
  }
};

export default handleSignIn;
