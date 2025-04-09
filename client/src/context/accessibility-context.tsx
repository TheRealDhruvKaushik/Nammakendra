import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityContextType {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 16,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
  language: "english",
  setLanguage: () => {},
});

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedSize = localStorage.getItem("fontSize");
    return savedSize ? parseInt(savedSize) : 16;
  });
  
  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "english";
  });
  
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);
  
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  
  const increaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 2, 24));
  };
  
  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12));
  };
  
  const resetFontSize = () => {
    setFontSize(16);
  };
  
  return (
    <AccessibilityContext.Provider 
      value={{ 
        fontSize, 
        increaseFontSize, 
        decreaseFontSize, 
        resetFontSize,
        language,
        setLanguage
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
