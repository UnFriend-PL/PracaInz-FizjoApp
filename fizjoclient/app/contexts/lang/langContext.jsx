import React, { createContext, useEffect, useState } from "react";
import i18n from "@/app/i18n";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const currentLanguage = localStorage.getItem("lang");
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
      setLanguage(currentLanguage);
    }
  }, []);

  const changeLanguage = async (lng) => {
    await i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
