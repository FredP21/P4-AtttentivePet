import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;

  const contextValue = useMemo(
    () => ({ user, setUser, isAuthenticated }),
    [user, setUser, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
