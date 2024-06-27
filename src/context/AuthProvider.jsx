import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({
    isAuthenticated: false,
    username: "",
    password: "",
  });

  function login(username, password) {
    if (!username || password) return;
    setUser({
      isAuthenticated: true,
      username,
      password,
    });
  }
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Auth Context is being used outside of provider");
  else return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuthContext };
