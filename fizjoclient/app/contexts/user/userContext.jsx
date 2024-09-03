import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/authContext";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser != null && isAuthenticated) {
      setUser(JSON.parse(storedUser));
    }
    if (!isAuthenticated) {
      setUser(null);
    }
  }, [isAuthenticated]);

  const updateUser = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
