// src/lang/LanguageContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import translations from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  // Load saved language on first render
  useEffect(() => {
    const saved = localStorage.getItem("appLanguage");
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
  }, []);

  // Save when changed
  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

  const t = (key) => {
    const pack = translations[language] || translations.en;
    return pack[key] || translations.en[key] || key;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
