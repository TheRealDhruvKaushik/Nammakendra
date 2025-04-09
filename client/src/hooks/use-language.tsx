import { useState, useEffect } from "react";

type LanguageHook = {
  language: string;
  setLanguage: (lang: string) => void;
};

const useLanguage = (): LanguageHook => {
  const [language, setLanguageState] = useState<string>(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language");
      return savedLanguage || "english";
    }
    return "english";
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  return {
    language,
    setLanguage,
  };
};

export default useLanguage;
