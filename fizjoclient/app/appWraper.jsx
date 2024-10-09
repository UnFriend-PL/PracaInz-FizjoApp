"use client";
import Navbar from "./components/layout/Navbar/navbar";
import { AuthProvider } from "./contexts/auth/authContext";
import { LanguageProvider } from "./contexts/lang/langContext";
import { UserProvider } from "./contexts/user/userContext";

export const AppWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <LanguageProvider>
          <Navbar></Navbar>
          <div className="page">{children}</div>
        </LanguageProvider>
      </UserProvider>
    </AuthProvider>
  );
};
