import axios from "axios";

const handleSignIn = async (user, pass, logedIN, navigate, setLogin) => {
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
};

export default handleSignIn;
