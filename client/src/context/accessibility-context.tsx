import React, { createContext, useContext, useState, useEffect } from "react";
import { Languages, translations } from "@/lib/translations";

interface AccessibilityContextType {
  language: Languages;
  setLanguage: (lang: Languages) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  language: "english",
  setLanguage: () => {},
});

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  
  // Apply language settings when component mounts
  useEffect(() => {
    // Apply language-specific font size adjustments
    const fontSizeAdjustments = {
      english: 16, // baseline
      kannada: 16,
      hindi: 17,   // slightly larger for Hindi
      tamil: 16
    };
    
    // Apply the appropriate font size based on language
    document.documentElement.style.setProperty('--base-font-size', `${fontSizeAdjustments[language]}px`);
    
    // Apply language-specific CSS classes
    document.body.classList.remove('lang-english', 'lang-kannada', 'lang-hindi', 'lang-tamil');
    document.body.classList.add(`lang-${language}`);
  }, []);
  
  // Handle language changes
  useEffect(() => {
    try {
      localStorage.setItem("language", language);
      
      // Apply language-specific settings
      const fontSizeAdjustments = {
        english: 16, // baseline
        kannada: 16,
        hindi: 17,   // slightly larger for Hindi
        tamil: 16
      };
      
      // Update the document language attribute for accessibility
      document.documentElement.setAttribute('lang', language);
      
      // Update language class for language-specific styling
      document.body.classList.remove('lang-english', 'lang-kannada', 'lang-hindi', 'lang-tamil');
      document.body.classList.add(`lang-${language}`);
      
      // Apply the appropriate font size based on language
      document.documentElement.style.setProperty('--base-font-size', `${fontSizeAdjustments[language]}px`);
      
      // Broadcast language change event for components to catch
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
      
      console.log("App: Language changed to:", language);
    } catch (error) {
      console.error("Error saving language to localStorage:", error);
    }
  }, [language]);
  
  return (
    <AccessibilityContext.Provider 
      value={{ 
        language,
        setLanguage
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};