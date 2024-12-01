import { Box } from "@mui/material";
import "./Home.css";
import Navbar from "../components/navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <Box className="utilize">
        <Box>
          <Box variant="contained">
            <h1>Welcome To Copify...🛒🛍️</h1>
            <br />
            <h2>
              Whether you are enhancing your home, upgrading your technology, or
              discovering new lifestyle essentials, we are here to provide
              products that inspire and empower you. Thank you for choosing us
              as your trusted partner in this journey.
            </h2>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
