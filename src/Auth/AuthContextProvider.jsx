import { createContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const [Auth, setAuth] = useState(() => {
    const storedState = localStorage.getItem("auth");
    storedState
      ? JSON.parse(storedState)
      : { isLogged: false, token: "", userid: "", role: "" };
  });

  const login = (token, userid, role) => {
    setAuth({
      isLogged: true,
      token,
      userid,
      role,
    });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({
      isLogged: false,
      token: "",
      role: "",
      userid: "",
    });
  };

  return (
    <>
      <AuthContext.Provider value={{ Auth, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
