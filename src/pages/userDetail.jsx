import { Box, Button, TextField } from "@mui/material";
import "./userDetail.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../Indicators/LoadingIndicator";
import ErrorIndicator from "../Indicators/ErrorIndicator";
import { userToken } from "../Auth/Token";

const UserDetail = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
  });

  const FetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/admin/get-users/${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status == 200) {
        setUserInfo(res.data.users);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios({
        method: "patch",
        url: `${import.meta.env.VITE_BASE_URL}/admin/update-user/${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: userInfo,
      });
      if (res.status == 200) {
        setToggle(!toggle);
        alert("user updated successfully");
        navigate("/users");
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
    return <ErrorIndicator />;
  }

  return (
    <>
      <Box className="edit-user">
        <Box>
          <TextField
            label="name"
            fullWidth
            type="text"
            placeholder="enter name..."
            value={userInfo.name}
            name="name"
            InputProps={{ readOnly: !toggle }}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="email"
            fullWidth
            type="email"
            name="email"
            placeholder="enter email..."
            value={userInfo.email}
            InputProps={{ readOnly: !toggle }}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="Role"
            fullWidth
            type="text"
            name="role"
            placeholder="enter role..."
            value={userInfo.role}
            InputProps={{ readOnly: !toggle }}
            onChange={handleChange}
          />
          <br />
          <br />
          <Box>
            {toggle ? (
              <Box className="update-buttons">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleUpdate(id)}
                >
                  Update
                </Button>
                <br />
                <br />
                <Button
                  fullWidth
                  onClick={() => setToggle(!toggle)}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button
                sx={{ backgroundColor: "greenyellow", color: "black" }}
                variant="contained"
                fullWidth
                onClick={() => setToggle(!toggle)}
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserDetail;
