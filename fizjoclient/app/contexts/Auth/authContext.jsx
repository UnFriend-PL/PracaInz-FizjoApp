import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    let decodedToken;

    try {
      decodedToken = storedToken ? jwtDecode(storedToken) : null;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      router.push("/auth");
      return;
    }
    if (storedToken && decodedToken && !isTokenExpired(decodedToken)) {
      setIsAuthenticated(true);
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      console.log("Role: ", role);
      setRole(role);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setRole(null);
      router.push("/auth");
    }
  }, [isAuthenticated]);

  const isTokenExpired = (token) => {
    try {
      const currentTime = Date.now() / 1000;
      return token.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
