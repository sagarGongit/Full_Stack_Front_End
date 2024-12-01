import { Box, Button } from "@mui/material";
import "./users.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIndicator from "../Indicators/LoadingIndicator";
import ErrorIndicator from "../Indicators/ErrorIndicator";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { userToken } from "../Auth/Token";

const Users = () => {
  const [loading, setLoading] = useState();
  const [err, setErr] = useState();
  const [user, setUsers] = useState();
  const navigate = useNavigate();

  const FetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/admin/get-users`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status == 200) {
        setUsers(res.data.users);
        setLoading(false);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${import.meta.env.VITE_BASE_URL}/admin/delete-user/${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status == 200) {
        alert("user deleted successfully");
        navigate("/users");
      } else {
        setErr(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchUsers();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (err) {
    return <ErrorIndicator error={err} />;
  }

  return (
    <>
      <Navbar />
      <Box className="users">
        {user &&
          user.map((users) => (
            <Box className="user" key={users._id}>
              <h3>Name : {users.name}</h3>
              <h4>Email : {users.email}</h4>
              <h5>Role : {users.role}</h5>
              <br />
              <Box className="user-buttons">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "orange" }}
                  onClick={() => navigate(`/users/${users._id}`)}
                >
                  View
                </Button>
                <Button
                  onClick={() => handleDelete(users._id)}
                  variant="contained"
                  sx={{ backgroundColor: "red" }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default Users;
