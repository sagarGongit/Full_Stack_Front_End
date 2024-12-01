import { Navigate } from "react-router-dom";
import { userToken } from "../Auth/Token";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  if (!userToken) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
