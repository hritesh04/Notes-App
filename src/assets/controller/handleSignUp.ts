import axios from "axios";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";

const handleSignUp = async (
  user: string,
  pass: string,
  email: string,
  logedIN: boolean,
  navigate: NavigateFunction,
  setLogin: Dispatch<React.SetStateAction<string>>
) => {
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
      logedIN = true;
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    }
  } catch (error) {
    setLogin(error.response.data.message);
  }
};

export default handleSignUp;
