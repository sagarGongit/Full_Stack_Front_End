import { Box } from "@mui/material";
import "./ErrorIndicator.css";
// eslint-disable-next-line react/prop-types
const ErrorIndicator = ({ error }) => {
  return (
    <>
      <Box className="error-indicator">
        <h1>{error}</h1>
      </Box>
    </>
  );
};

export default ErrorIndicator;
