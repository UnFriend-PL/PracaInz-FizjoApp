"use client";
import Navbar from "./components/layout/Navbar/navbar";
import { AuthProvider } from "./contexts/auth/authContext";
import { UserProvider } from "./contexts/user/userContext";

export const AppWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <Navbar></Navbar>
        <div className="page">{children}</div>
      </UserProvider>
    </AuthProvider>
  );
};
