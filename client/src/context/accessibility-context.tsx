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

// Helper function to directly apply font size to all text elements
const applyFontSizeToDOM = (size: number) => {
  document.body.style.fontSize = `${size}px`;
  document.documentElement.style.setProperty('--base-font-size', `${size}px`);
  // Force DOM update by setting a data attribute
  document.documentElement.setAttribute('data-font-size', size.toString());
  
  // Directly target common text elements for immediate visual feedback
  const textElements = document.querySelectorAll('p, li, a, button, span, label, input, textarea');
  textElements.forEach(element => {
    (element as HTMLElement).style.fontSize = `${size}px`;
  });
  
  // Special handling for headings
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((element, index) => {
    const headingSize = size + (6 - index) * 2; // Larger sizes for h1, progressively smaller for h6
    (element as HTMLElement).style.fontSize = `${headingSize}px`;
  });
};

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
  
  // Apply font size when component mounts
  useEffect(() => {
    applyFontSizeToDOM(fontSize);
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem("fontSize", fontSize.toString());
      applyFontSizeToDOM(fontSize);
    } catch (error) {
      console.error("Error saving fontSize to localStorage:", error);
    }
  }, [fontSize]);
  
  useEffect(() => {
    try {
      localStorage.setItem("language", language);
      // Force re-render when language changes
      document.documentElement.setAttribute('lang', language);
      // Broadcast language change event for components to catch
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
    } catch (error) {
      console.error("Error saving language to localStorage:", error);
    }
  }, [language]);
  
  const increaseFontSize = () => {
    setFontSize(prevSize => {
      const newSize = Math.min(prevSize + 2, 24);
      console.log(`Increasing font size from ${prevSize} to ${newSize}`);
      return newSize;
    });
  };
  
  const decreaseFontSize = () => {
    setFontSize(prevSize => {
      const newSize = Math.max(prevSize - 2, 12);
      console.log(`Decreasing font size from ${prevSize} to ${newSize}`);
      return newSize;
    });
  };
  
  const resetFontSize = () => {
    console.log(`Resetting font size from ${fontSize} to 16`);
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
