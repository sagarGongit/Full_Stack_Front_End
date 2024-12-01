import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./signup.css";
import { Form, Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import LoadingIndicator from "../Indicators/LoadingIndicator";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const userInfo = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        userInfo
      );
      if (res.status == 200) {
        alert("registration successful");
        setLoading(false);
        navigate("/login");
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
      <Box className="signup">
        <Box>
          <h1>Sign-Up</h1>
          <Formik>
            <Form onSubmit={handleSignup}>
              <TextField
                fullWidth
                type="text"
                id="name"
                placeholder="enter your name..."
                label="Name"
                required
              />
              <br />
              <br />
              <TextField
                fullWidth
                type="email"
                id="email"
                placeholder="enter your email..."
                variant="outlined"
                label="Email"
                required
              />
              <br />
              <br />
              <TextField
                fullWidth
                type="password"
                id="password"
                placeholder="enter your password..."
                label="Password"
                variant="outlined"
                required
              />
              <br />
              <br />
              {err && <h4 style={{ color: "red" }}>{err}</h4>} <br />
              <h4 style={{ fontWeight: "bold" }}>
                If you have an already have account click{" "}
                <Link to={"/login"}>here</Link>👈🏻
              </h4>
              <br />
              <Button type="submit" fullWidth variant="contained">
                Register
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
