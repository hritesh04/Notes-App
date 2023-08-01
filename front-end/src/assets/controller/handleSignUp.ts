import axios from "axios";

const handleSignUp = async (user, pass, email, logedIN, navigate, setLogin) => {
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
    setLogin(error.response.data.message);
  }
};

export default handleSignUp;
