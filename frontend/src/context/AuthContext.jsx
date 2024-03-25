import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = user !== null;

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleDelog = (navigate) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
      })
      .then(() => {
        navigate("/");
        toast.success("Vous êtes déconnecté");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const contextValue = useMemo(
    () => ({ user, setUser, getUser, handleDelog, isAuthenticated, isLoading }),
    [user, setUser, handleDelog, getUser, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
