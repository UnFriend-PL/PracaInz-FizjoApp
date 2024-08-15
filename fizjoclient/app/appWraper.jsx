"use client";
import Navbar from "./components/layout/Navbar/navbar";
import { AuthProvider } from "./contexts/Auth/authContext";

export const AppWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <Navbar></Navbar>
      <div className="page">{children}</div>
    </AuthProvider>
  );
};
