import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import "./navbar.css";
import { userToken } from "../Auth/Token";
import { useState } from "react";
import axios from "axios";
import ErrorIndicator from "../Indicators/ErrorIndicator";

const Navbar = () => {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/user/logout`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status == 200) {
        alert("logout successful");
        localStorage.removeItem("userid");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  if (err) {
    return <ErrorIndicator error={err} />;
  }

  return (
    <>
      <Box className="navbar">
        <Box className="search-box">
          <TextField
            sx={{ width: "25vw", fontSize: "16px" }}
            variant="standard"
          />
          <FaSearchengin fontSize={25} cursor={"pointer"} />
        </Box>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
        <Link to={"/users"}>Users</Link>
        {userToken && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={Logout}
          >
            Logout
          </Button>
        )}
        {!userToken && (
          <Box className="buttons">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navbar;
