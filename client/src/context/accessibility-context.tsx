import React, { createContext, useContext, useState, useEffect } from "react";
import { Languages } from "@/lib/translations";

interface AccessibilityContextType {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  language: Languages;
  setLanguage: (lang: Languages) => void;
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
    try {
      const savedSize = localStorage.getItem("fontSize");
      return savedSize ? parseInt(savedSize) : 16;
    } catch (error) {
      console.error("Error accessing localStorage for fontSize:", error);
      return 16;
    }
  });
  
  const [language, setLanguage] = useState<Languages>(() => {
    try {
      const savedLanguage = localStorage.getItem("language") as Languages | null;
      return savedLanguage && ["english", "kannada", "hindi", "tamil"].includes(savedLanguage) 
        ? savedLanguage as Languages 
        : "english";
    } catch (error) {
      console.error("Error accessing localStorage for language:", error);
      return "english";
    }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem("fontSize", fontSize.toString());
    } catch (error) {
      console.error("Error saving fontSize to localStorage:", error);
    }
  }, [fontSize]);
  
  useEffect(() => {
    try {
      localStorage.setItem("language", language);
      // Force re-render when language changes
      document.documentElement.setAttribute('lang', language);
    } catch (error) {
      console.error("Error saving language to localStorage:", error);
    }
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
