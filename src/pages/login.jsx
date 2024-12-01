import { Box, Button } from "@mui/material";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import LoadingIndicator from "../Indicators/LoadingIndicator";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userInfo = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        userInfo
      );
      if (res.status == 200) {
        console.log(res);
        setLoading(false);
        const token = res.data.token;
        const userID = res.data.userid;
        const role = res.data.role;
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userID);
        localStorage.setItem("role", role);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Box className="login">
        <Box>
          <h1>Login</h1>
          <Formik>
            <Form onSubmit={handleLogin}>
              <TextField
                fullWidth
                type="email"
                id="email"
                placeholder="enter your email..."
                label="Email"
                required
              />
              <br />
              <br />
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                id="password"
                label="Password"
                placeholder="enter your password..."
                required
              />
              <br />
              <br />
              <h4>
                If you have not any account click to{" "}
                <Link to={"/register"}>register</Link>👈🏻
              </h4>
              {err && <h4 style={{ color: "red" }}>{err}</h4>}
              <br />
              <Button type="submit" fullWidth variant="contained">
                Login
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default Login;
